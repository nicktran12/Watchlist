import React from 'react'

export const MovieCard = ({movie}) => {
  return (
    <div className="movie-card">
        <div className="poster-wrapper">
            {movie.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                />
            ) : (
                <div className="filler-poster"></div>
            )}
        </div>

        <div className="info">
            <div className="header">
                <h3 className="title">{movie.title}</h3>
                <h4 className="overview-date">
                    {movie.overview ? movie.overview.substring(0, 180) + "..." : "-"}
                </h4>
            </div>

            <div className="controls">
                <button className="btn">Add to Watchlist</button>
                <button className="btn">Add to Watched</button>
            </div>
        </div>
    </div>
  )
}
