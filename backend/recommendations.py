import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

def load_movie_data():
    if not os.path.exists("data/movies.csv"):
        return pd.DataFrame()
    return pd.read_csv("data/movies.csv")

def preprocess_data(df):
    df["description"] = df["overview"].fillna("")
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(df["description"])
    return tfidf_matrix, vectorizer

def recommend_movies(movie_data):
    movies_df = load_movie_data()
    if movies_df.empty:
        return []
    
    content_type = movie_data.get("type")
    if content_type not in ("movie", "tv"):
        content_type = "movie" if movie_data.get("title") else "tv"
    
    tfidf_matrix, vectorizer = preprocess_data(movies_df)

    movie_description = movie_data.get("overview", "")
    if not movie_description:
        return []
    
    input_vec = vectorizer.transform([movie_description])
    input_sim = cosine_similarity(input_vec, tfidf_matrix)[0]
    
    sim_scores = sorted(enumerate(input_sim), key=lambda x: x[1], reverse=True)
    top_indices = [i[0] for i in sim_scores[:10]]

    recommendations = []
    input_id = movie_data.get("id")
    for i in top_indices:
        rec = movies_df.iloc[i]
        rec_id = rec["id"]
        if rec_id == input_id:
            continue

        if content_type == "movie":
            recommendations.append({
                "id": int(rec["id"]),
                "title": rec["title"],
                "overview": rec["overview"],
                "poster_path": rec["poster_path"],
                "vote_average": float(rec["vote_average"])
            })
        elif content_type == "tv":
            recommendations.append({
                "id": int(rec["id"]),
                "name": rec["name"],
                "overview": rec["overview"],
                "poster_path": rec["poster_path"],
                "vote_average": float(rec["vote_average"])
            })
    return recommendations
