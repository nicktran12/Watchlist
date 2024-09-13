import React, {useContext} from 'react'
import {GlobalContext} from "../context/GlobalState";

export const MovieCard = ({movie}) => {
    const {addMovieToWatchlist, watchlist} = useContext(GlobalContext);
    const {addMovieToWatched, watched} = useContext(GlobalContext);

    let storedWatchlist = watchlist.find(o => o.id === movie.id);
    let storedWatched = watched.find(o => o.id === movie.id);

    const watchlistDisabled = storedWatchlist ? true : false;
    const watchedDisabled = storedWatched ? true : false;

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
                    <button className="btn"
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchlist(movie)}>
                        Add to Watchlist
                    </button>
                    <button className="btn"
                    disabled={watchedDisabled}
                    onClick={() => addMovieToWatched(movie)}>
                        Add to Watched
                    </button>
                </div>
            </div>
        </div>
    )
}
