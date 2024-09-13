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
                    <img src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
                    alt={`${tv.title} Poster`}/>
                ) : (
                    <div className="filler-poster"></div>
                )}
            </div>

            <div className="info">
                <div className="header">
                    <h3 className="title">{tv.name}</h3>
                    <h4 className="overview">
                        {tv.overview ? tv.overview.substring(0, 180) + "..." : "-"}
                    </h4>
                </div>

                <div className="controls">
                    <button className="btn"
                    disabled={watchedDisabled}
                    onClick={() => addMovieToWatched(tv)}>
                        Add to Watched
                    </button>

                    <button className="btn"
                    disabled={watchingDisabled}
                    onClick={() => addMovieToWatching(tv)}>
                        Add to Watching
                    </button>

                    <button className="btn"
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchlist(tv)}>
                        Add to Watchlist
                    </button>
                </div>
            </div>
        </div>
    )
}
