import React, {useContext} from 'react';
import {GlobalContext} from "../context/GlobalState";

export const TVCard = ({tv}) => {
    const {
        addMovieToWatched, addMovieToWatching, addMovieToWatchlist,
        watched, watching, watchlist
    } = useContext(GlobalContext);

    let storedWatched = watched.find(o => o.id === tv.id)
    let storedWatching = watching.find(o => o.id === tv.id);
    let storedWatchlist = watchlist.find(o => o.id === tv.id);

    const watchedDisabled = storedWatched ? true : false;
    const watchingDisabled = storedWatching ? true : false;
    const watchlistDisabled = storedWatchlist ? true : false;

    return (
        <div className="result-card">
            <div className="poster-wrapper">
                {tv.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                    alt={`${tv.title} Poster`}/>
                ) : (
                    <div className="filler-poster"></div>
                )}
            </div>

            <div className="info">
                <div className="header">
                    <h3 className="title">{tv.name}</h3>

                    <h4 className="overview">
                        {tv.overview ? tv.overview.substring(0, 180) + "..." : "---"}
                    </h4>

                    <h4 className="rating">
                        {tv.vote_average ? tv.vote_average.toFixed(1) + "/10" : "--/10"}
                    </h4>
                </div>

                <div className="controls">
                    <button className="add-btn"
                    disabled={watchedDisabled}
                    onClick={() => addMovieToWatched(tv)}>
                        Watched
                    </button>

                    <button className="add-btn"
                    disabled={watchingDisabled}
                    onClick={() => addMovieToWatching(tv)}>
                        Watching
                    </button>

                    <button className="add-btn"
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchlist(tv)}>
                        Watchlist
                    </button>
                </div>
            </div>
        </div>
    )
}
