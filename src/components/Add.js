import React, {useState} from 'react';
import {MovieCard} from "./MovieCard";
import {TVCard} from "./TVCard";

export const Add = () => {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const [results1, setResults1] = useState([]);
  const [results2, setResults2] = useState([]);

  const onChange = e => {
    e.preventDefault();

    setQuery(e.target.value);
    if (e.target.value.length > 0)
      setShow(true)
    else
      setShow(false)
  }

  const movieChange = e => {
    setResults2([]);

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
    .then(res => res.json()
    .then(data => {
      if (!data.errors) {
        setResults1(data.results);
      } else {
        setResults1([]);
      }
    }));
  }

  const tvChange = e => {
    setResults1([]);

    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
    .then(res => res.json()
    .then(data => {
      if (!data.errors) {
        setResults2(data.results);
      } else {
        setResults2([]);
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

            {show && 
              <button className="btn" onClick={() => {movieChange();}}>
                Movies
              </button>
            }
            {show && 
              <button className="btn" onClick={() => {tvChange();}}>
                TV shows
              </button>
            }
          </div>

          {results1.length > 0 && (
            <ul className="results">
              {results1.map(movie => (
                <li key={movie.id}>
                  <MovieCard movie={movie}/>
                </li>
              ))}
            </ul>
          )}

          {results2.length > 0 && (
            <ul className="results">
              {results2.map(tv => (
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
