import React, {useState, useEffect, useCallback, useContext} from 'react';
import {MovieCard} from "./MovieCard";
import {TVCard} from "./TVCard";
import {GlobalContext} from "../context/GlobalState";

export const Add = () => {
  const {watched} = useContext(GlobalContext);

  const [query, setQuery] = useState("");

  const [defaultResults, showDefaultResults] = useState(true);
  const [suggestedMovies, setSuggestedMovies] = useState([]);

  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTVResults] = useState([]);

  const [movieDisabled, setMovieDisabled] = useState(true);
  const [tvDisabled, setTVDisabled] = useState(true);

  const getMostRecentWatched = () => {
    if (watched.length === 0) {
      return null;
    }
    return watched[0];
  }

  const mostRecent = getMostRecentWatched();
  const genreIDs = mostRecent?.genre_ids.join(",") ?? "";
  const type = mostRecent?.title ? "movie" : mostRecent?.name ? "tv" : null;
  const id = mostRecent?.id;

  const getRecommendations = useCallback(async () => {
    if (genreIDs && type && watched.length > 0) {
      try {
        const fetchResponse = await fetch("http://localhost:5001/fetch-movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({genre_id: genreIDs, type: type, id: id}),
        })

        if (!fetchResponse.ok) {
          console.error("Error fetching movies");
        }

        const recommendationsResponse = await fetch("http://localhost:5001/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...mostRecent, type}),
        })

        if (recommendationsResponse.ok) {
          const recommendations = await recommendationsResponse.json();
          setSuggestedMovies(recommendations);
        } else {
          console.error("Error fetching recommendations");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [genreIDs, watched, mostRecent, type])

  useEffect(() => {
    if (genreIDs && watched.length > 0) {
      getRecommendations();
    }
  }, [genreIDs, watched, getRecommendations])

  const onChange = e => {
    e.preventDefault();

    setQuery(e.target.value);
    if (e.target.value.length > 0) {
      setMovieDisabled(false)
      setTVDisabled(false)
    }
    else {
      showDefaultResults(true)
      setMovieDisabled(true)
      setTVDisabled(true)
    }
  }

  const movieChange = e => {
    showDefaultResults(false)
    setTVResults([]);
    setTVDisabled(false);
    setMovieDisabled(true)

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
    .then(res => res.json()
    .then(data => {
      if (!data.errors) {
        setMovieResults(data.results);
      } else {
        setMovieResults([]);
      }
    }))
  }

  const tvChange = e => {
    showDefaultResults(false)
    setMovieResults([]);
    setMovieDisabled(false);
    setTVDisabled(true);

    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
    .then(res => res.json()
    .then(data => {
      if (!data.errors) {
        setTVResults(data.results);
      } else {
        setTVResults([]);
      }
    }));
  }

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input type="text" 
            placeholder="Search"
            value={query}
            onChange={onChange}
            />

            <button id="search-btn" className="btn" onClick={() => {movieChange()}} disabled={movieDisabled}>
              Movies
            </button>

            <button id="search-btn" className="btn" onClick={() => {tvChange()}} disabled={tvDisabled}>
              TV shows
            </button>
          </div>

          {suggestedMovies.length > 0 && defaultResults && (
            <ul className="results">
              {suggestedMovies.map(item => (
                <li key={item.id}>
                  {item.title
                    ? <MovieCard movie={item}/>
                    : <TVCard tv={item}/>
                  }
                </li>
              ))}
            </ul>
          )}

          {movieResults.length > 0 && !defaultResults && (
            <ul className="results">
              {movieResults.map(movie => (
                <li key={movie.id}>
                  <MovieCard movie={movie}/>
                </li>
              ))}
            </ul>
          )}

          {tvResults.length > 0 && !defaultResults && (
            <ul className="results">
              {tvResults.map(tv => (
                <li key={tv.id}>
                  <TVCard tv={tv}/>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
