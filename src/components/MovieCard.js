import React, {useContext} from 'react';
import {GlobalContext} from "../context/GlobalState";

export const MovieCard = ({movie}) => {
    const {
        addMovieToWatched, addMovieToWatching, addMovieToWatchlist,
        watched, watching, watchlist
    } = useContext(GlobalContext);

    let storedWatched = watched.find(o => o.id === movie.id)
    let storedWatching = watching.find(o => o.id === movie.id);
    let storedWatchlist = watchlist.find(o => o.id === movie.id);

    const watchedDisabled = storedWatched ? true : false;
    const watchingDisabled = storedWatching ? true : false;
    const watchlistDisabled = storedWatchlist ? true : false;

    return (
        <div className="result-card">
            <div className="poster-wrapper">
                {movie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`${movie.title} Poster`}/>
                ) : (
                    <div className="filler-poster"></div>
                )}
            </div>

            <div className="info">
                <div className="header">
                    <h3 className="title">{movie.title}</h3>

                    <h4 className="overview">
                        {movie.overview ? movie.overview.substring(0, 180) + "..." : "---"}
                    </h4>

                    <h4 className="rating">
                        {movie.vote_average ? movie.vote_average.toFixed(1) + "/10" : "--/10"}
                    </h4>
                </div>

                <div className="controls">
                    <button className="btn"
                    disabled={watchedDisabled}
                    onClick={() => addMovieToWatched(movie)}>
                        Watched
                    </button>

                    <button className="btn"
                    disabled={watchingDisabled}
                    onClick={() => addMovieToWatching(movie)}>
                        Watching
                    </button>

                    <button className="btn"
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchlist(movie)}>
                        Watchlist
                    </button>
                </div>
            </div>
        </div>
    )
}
