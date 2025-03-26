import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

def load_movie_data():
    if not os.path.exists("data/movies.csv"):
        return pd.DataFrame()
    return pd.read_csv("data/movies.csv")

movies_df = load_movie_data()

def preprocess_data(df):
    df["description"] = df["overview"].fillna("")
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(df["description"])
    return tfidf_matrix, vectorizer

if not movies_df.empty:
    tfidf_matrix, vectorizer = preprocess_data(movies_df)
else:
    tfidf_matrix = None
    vectorizer = None

cosine_sim = cosine_similarity(tfidf_matrix) if tfidf_matrix is not None else None

def recommend_movies(movie_data):
    if movies_df.empty or cosine_sim is None:
        return []
    
    movie_description = movie_data.get("overview", "")
    if not movie_description:
        return []
    
    input_vec = vectorizer.transform([movie_description])
    input_sim = cosine_similarity(input_vec, tfidf_matrix)

    sim_scores = list(enumerate(input_sim[0]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    movie_indices = [i[0] for i in sim_scores[0:10]]

    return movies_df.iloc[movie_indices].to_dict(orient="records")
