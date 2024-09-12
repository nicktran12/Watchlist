import React, {useState} from 'react';
import {MovieCard} from "./MovieCard";
import {TVCard} from "./TVCard";

export const Add = () => {
  const [query1, setQuery1] = useState("");
  const [results1, setResults1] = useState([]);
  const [query2, setQuery2] = useState("");
  const [results2, setResults2] = useState([]);

  const onChange1 = e1 => {
    e1.preventDefault();

    setQuery1(e1.target.value);

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e1.target.value}`)
    .then(res => res.json()
    .then(data => {
      if (!data.errors) {
        setResults1(data.results);
      } else {
        setResults1([]);
      }
    }));
  }

  const onChange2 = e2 => {
    e2.preventDefault();

    setQuery2(e2.target.value);

    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e2.target.value}`)
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
            placeholder="Search movies"
            value={query1}
            onChange={onChange1}
            />

            <input type="text"
            placeholder="Search TV shows"
            value={query2}
            onChange={onChange2}
            />
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
