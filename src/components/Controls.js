import React, {useState, useContext} from 'react';
import {GlobalContext} from "../context/GlobalState";

export const Controls = ({movie, type}) => {
    const {
        removeMovieFromWatched, removeMovieFromWatching, removeMovieFromWatchlist,
        addMovieToWatched, addMovieToWatching, addMovieToWatchlist,
        watched, watching, watchlist
    } = useContext(GlobalContext);

    let storedWatched = watched.find(o => o.id === movie.id)
    let storedWatching = watching.find(o => o.id === movie.id);
    let storedWatchlist = watchlist.find(o => o.id === movie.id);

    const watchedDisabled = storedWatched ? true : false;
    const watchingDisabled = storedWatching ? true : false;
    const watchlistDisabled = storedWatchlist ? true : false;

    const [showMove, setShowMove] = useState(true);
    const [showLocation, setShowLocation] = useState(false);
    
    const moveClick = e => {
        setShowMove(false);
        setShowLocation(true)
    }
    
    return (
        <div className="inner-card-controls">
            {type === "watched" && 
                <>
                {showMove &&
                    <button className="ctrl-btn"
                    onClick={() => {moveClick()}}>
                        Move
                    </button>
                }

                {showLocation &&
                    <>
                    <button className="ctrl-btn"
                    disabled={watchingDisabled}
                    onClick={() => {
                        removeMovieFromWatched(movie.id);
                        addMovieToWatching(movie);
                    }}>
                        Watching
                    </button>

                    <button className="ctrl-btn"
                    disabled={watchlistDisabled}
                    onClick={() => {
                        removeMovieFromWatched(movie.id);
                        addMovieToWatchlist(movie);
                    }}>
                        Watchlist
                    </button>
                    </>
                }
                
                <button className="ctrl-btn"
                onClick={() => removeMovieFromWatched(movie.id)}>
                    Remove
                </button>
                </>
            }

            {type === "watching" && (
                <>
                {showMove &&
                    <button className="ctrl-btn"
                    onClick={() => {moveClick()}}>
                        Move
                    </button>
                }

                {showLocation &&
                    <>
                    <button className="ctrl-btn"
                    disabled={watchedDisabled}
                    onClick={() => {
                        removeMovieFromWatching(movie.id);
                        addMovieToWatched(movie);
                    }}>
                        Watched
                    </button>

                    <button className="ctrl-btn"
                    disabled={watchlistDisabled}
                    onClick={() => {
                        removeMovieFromWatching(movie.id);
                        addMovieToWatchlist(movie);
                    }}>
                        Watchlist
                    </button>
                    </>
                }

                <button className="ctrl-btn"
                onClick={() => removeMovieFromWatching(movie.id)}>
                    Remove
                </button>
                </>
            )}

            {type === "watchlist" && (
                <>
                {showMove &&
                    <button className="ctrl-btn"
                    onClick={() => {moveClick()}}>
                        Move
                    </button>
                }

                {showLocation &&
                    <>
                    <button className="ctrl-btn"
                    disabled={watchedDisabled}
                    onClick={() => {
                        removeMovieFromWatchlist(movie.id);
                        addMovieToWatched(movie);
                    }}>
                        Watched
                    </button>

                    <button className="ctrl-btn"
                    disabled={watchingDisabled}
                    onClick={() => {
                        removeMovieFromWatchlist(movie.id);
                        addMovieToWatching(movie);
                    }}>
                        Watching
                    </button>
                    </>
                }

                <button className="ctrl-btn"
                onClick={() => removeMovieFromWatchlist(movie.id)}>
                    Remove
                </button>
                </>
            )}
        </div>
    )
}
