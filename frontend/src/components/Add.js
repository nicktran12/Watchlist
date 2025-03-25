import React, {useState, useEffect} from 'react';
import {MovieCard} from "./MovieCard";
import {TVCard} from "./TVCard";

export const Add = () => {
  const [query, setQuery] = useState("");

  const [defaultResults, showDefaultResults] = useState(true);
  const [suggestedMovies, setSuggestedMovies] = useState([]);

  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTVResults] = useState([]);

  const [movieDisabled, setMovieDisabled] = useState(true);
  const [tvDisabled, setTVDisabled] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`)
      .then(res => res.json()
      .then(data => {
        if (!data.errors) {
          setSuggestedMovies(data.results);
        } else {
          setSuggestedMovies([]);
        }
    }))
  })

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
              {suggestedMovies.map(movie => (
                <li key={movie.id}>
                  <MovieCard movie={movie}/>
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
