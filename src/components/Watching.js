import React, {useContext} from 'react';
import {GlobalContext} from "../context/GlobalState";
import {ResultCard} from "./ResultCard";

export const Watching = () => {
  const {watching} = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Currently Watching</h1>

          <span className="count-pill">
            {watching.length} {watching.length === 1 ? "Movie/Show" : "Movies/Shows"}
          </span>
        </div>

        {watching.length > 0 ? (
          <div className="movie-grid">
          {watching.map(movie => (
            <ResultCard movie={movie} type="watching"/>
          ))}
        </div>
        ) : (
          <h2 className="no-movies">Nothing being watched</h2>
        )}
      </div>
    </div>
  )
}