import React, {useContext} from 'react';
import {GlobalContext} from "../context/GlobalState";
import {ResultCard} from "./ResultCard";

export const Watched = () => {
  const {watched} = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Already Watched</h1>

          <span className="count-pill">
            {watched.length} {watched.length === 1 ? "Movie/Show" : "Movies/Shows"}
          </span>
        </div>

        {watched.length > 0 ? (
          <div className="movie-grid">
            {watched.map(movie => (
              <ResultCard movie={movie} status="watched"/>
            ))}
        </div>
        ) : (
          <h2 className="no-movies">Nothing watched</h2>
        )}
      </div>
    </div>
  )
}
