import React, {useState, useContext} from 'react';
import {GlobalContext} from "../context/GlobalState"; 

export const Controls = ({movie, status}) => {
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

    const [showLocation, setShowLocation] = useState(false);
    
    const moveClick = e => {
        setShowLocation(showLocation => !showLocation);
    }
    
    return (
        <div className="inner-card-controls">
            {status === "watched" && 
                <>
                <button className="remove-btn"
                onClick={() => removeMovieFromWatched(movie.id)}>
                    <i className="fa-fw fa fa-times"></i>
                </button>

                <div className="move-controls">
                    <button className="move-btn"
                    onClick={() => {moveClick()}}>
                        Move
                    </button>

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
                </div>
                </>
            }

            {status === "watching" && (
                <>
                <button className="remove-btn"
                onClick={() => removeMovieFromWatching(movie.id)}>
                    <i className="fa-fw fa fa-times"></i>
                </button>

                <div className="move-controls">
                    <button className="move-btn"
                    onClick={() => {moveClick()}}>
                        Move
                    </button>

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
                </div>
                </>
            )}

            {status === "watchlist" && (
                <>
                <button className="remove-btn"
                onClick={() => removeMovieFromWatchlist(movie.id)}>
                    <i className="fa-fw fa fa-times"></i>
                </button>

                <div className="move-controls">
                    <button className="move-btn"
                    onClick={() => {moveClick()}}>
                        Move
                    </button>

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
                </div>
                </>
            )}
        </div>
    )
}
