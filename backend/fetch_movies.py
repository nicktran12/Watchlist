import pandas as pd
import requests
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("TMDB_API_KEY")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "data", "movies.csv")

def fetch_movies(genre_id, page=1):
    response = requests.get(f"https://api.themoviedb.org/3/discover/tv?api_key={API_KEY}&language=en-US&page={page}&include_adult=false&with_genres={genre_id}")

    if response.status_code == 200:
        return response.json().get("results", [])
    else:
        print(f"Error fetching data from TMDB API: {response.status_code}")
        return []

def get_all_movies(genre_id, pages=10):
    all_movies = []
    for page in range(1, pages + 1):
        print(f"Fetching page {page}...")
        movies = fetch_movies(genre_id, page)

        if not movies:
            break
        all_movies.extend(movies)
    return all_movies

def save_to_csv(movies):
    df = pd.DataFrame(movies, columns=["id", "name", "overview", "genre_ids", "poster_path", "vote_average"])
    df.to_csv(OUTPUT_FILE, index=False)
    print(f"Saved {len(df)} movies to {OUTPUT_FILE}")