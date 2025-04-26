from flask import Flask, request, jsonify
from flask_cors import CORS
from fetch_movies import get_all_movies, save_to_csv, load_from_cache, save_to_cache
from recommendations import recommend_movies

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route("/fetch-movies", methods=["POST"])
def fetch_movies_route():
    data = request.get_json()
    genre_ids = data.get("genre_ids") or ([data.get("genre_id")] if data.get("genre_id") else [])
    content_type = data.get("type", "")
    content_id = data.get("id")

    if not genre_ids or not content_type or not content_id:
        return jsonify({"error": "Must provide genre_ids, type, and id"}), 400
    genre_params = ",".join(str(genre_id) for genre_id in genre_ids)

    cached_data = load_from_cache(content_id, content_type)
    if cached_data is not None:
        cached_data.to_csv("data/movies.csv", index=False)
        return jsonify({"message": f"Loaded {len(cached_data)} movies from cache"}), 200

    num_pages = data.get("pages", 10)
    movies = get_all_movies(genre_params, content_type, num_pages)
    if movies:
        save_to_csv(movies)
        save_to_cache(movies, content_id, content_type)
        return jsonify({"message": f"Successfully scraped and saved {len(movies)} movies",}), 200
    else:
        return jsonify({"error": "Failed to fetch movies"}), 500
    
@app.route("/recommendations", methods=["POST"])
def recommendations_route():
    try:    
        movie_data = request.get_json()
        recommendations = recommend_movies(movie_data)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)