import pandas as pd
import requests
import os
import time
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("TMDB_API_KEY")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "data", "movies.csv")
CACHE_DIR = os.path.join(os.path.dirname(__file__), "cache")
CACHE_EXPIRATION_SECONDS = 7 * 24 * 60 * 60

def fetch_movies(genre_ids, content_type, page=1):
    url = f"https://api.themoviedb.org/3/discover/{content_type}"
    params = {
        "api_key": API_KEY,
        "language": "en-US",
        "page": page,
        "include_adult": "false",
        "with_genres": genre_ids
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json().get("results", [])
    else:
        print(f"Error fetching data from TMDB API: {response.status_code}")
        return []

def get_all_movies(genre_ids, content_type, pages=10):
    all_movies = []
    for page in range(1, pages + 1):
        movies = fetch_movies(genre_ids, content_type, page)
        if not movies:
            break
        all_movies.extend(movies)
    return all_movies

def save_to_csv(movies):
    df = pd.DataFrame(movies)
    if "title" not in df.columns:
        df["title"] = None
    if "name" not in df.columns:
        df["name"] = None

    columns = ["id", "title", "name", "overview", "genre_ids", "poster_path", "vote_average"]
    df = df[columns]
    df.to_csv(OUTPUT_FILE, index=False)
    print(f"Saved {len(df)} movies to {OUTPUT_FILE}")

def get_cache_path(content_id, content_type):
    return os.path.join(CACHE_DIR, f"{content_id}_{content_type}.csv")

def save_to_cache(movies, content_id, content_type):
    df = pd.DataFrame(movies)
    if "title" not in df.columns:
        df["title"] = None
    if "name" not in df.columns:
        df["name"] = None

    columns = ["id", "title", "name", "overview", "genre_ids", "poster_path", "vote_average"]
    df = df[columns]
    df.to_csv(get_cache_path(content_id, content_type), index=False)
    print(f"Saved {len(df)} movies to {content_id} ({content_type}) for caching")

def load_from_cache(content_id, content_type):
    path = get_cache_path(content_id, content_type)
    if not os.path.exists(path):
        return None
    
    last_modified = os.path.getmtime(path)
    now = time.time()
    age = now - last_modified
    if age > CACHE_EXPIRATION_SECONDS:
        print(f"Cache expired for {content_id}_({content_type}), fetching new data")
        os.remove(path)
        print(f"Deleted expired cache {path}")
        return None
    
    print(f"Loaded cache for {content_id}_{content_type}")
    return pd.read_csv(path)