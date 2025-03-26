from flask import Flask, request, jsonify
from flask_cors import CORS
from fetch_movies import get_all_movies, save_to_csv
from recommendations import recommend_movies

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route("/fetch-movies", methods=["POST", "OPTIONS"])
def fetch_movies_route():
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight request successful"}), 200

    data = request.get_json()
    genre_id = data.get("genre_id")

    if not genre_id:
        return jsonify({"error": "No genre_id provided"}), 400

    num_pages = data.get('pages', 10)
    movies = get_all_movies(genre_id, num_pages)
    if movies:
        save_to_csv(movies)
        return jsonify({"message": f"Successfully saved {len(movies)} movies to CSV"}), 200
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