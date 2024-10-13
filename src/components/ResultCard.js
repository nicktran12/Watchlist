import React from 'react'
import {Controls} from "./Controls";

export const ResultCard = ({movie, status}) => {
  return (
    <div className="card-list">
        <div className="overlay"></div>

        {movie.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} Poster`}/>
        ) : (
            <div className="filler-poster"></div>
        )}

        <Controls movie={movie} status={status}/>
    </div>
  )
}
