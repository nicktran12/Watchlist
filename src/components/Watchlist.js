import React, {useContext} from 'react';
import {GlobalContext} from "../context/GlobalState";
import {ResultCard} from "./ResultCard";

export const Watchlist = () => {
  const {watchlist} = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">My Watchlist</h1>

          <span className="count-pill">
            {watchlist.length} {watchlist.length === 1 ? "Movie/Show" : "Movies/Shows"}
          </span>
        </div>

        {watchlist.length > 0 ? (
          <div className="movie-grid">
            {watchlist.map(movie => (
              <ResultCard movie={movie} status="watchlist"/>
            ))}
        </div>
        ) : (
          <h2 className="no-movies">Nothing to watch</h2>
        )}
      </div>
    </div>
  )
}