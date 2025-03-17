import React, {useState, useContext} from 'react';
import {GlobalContext} from "../context/GlobalState"; 

export const Controls = ({movie, status}) => {
    const {
        removeMovieFromWatched, removeMovieFromWatching, removeMovieFromWatchlist,
        addMovieToWatched, addMovieToWatching, addMovieToWatchlist, moveMovie,
        watched, watching, watchlist
    } = useContext(GlobalContext);

    let storedWatched = watched.find(o => o.id === movie.id)
    let storedWatching = watching.find(o => o.id === movie.id);
    let storedWatchlist = watchlist.find(o => o.id === movie.id);

    const watchedDisabled = storedWatched ? true : false;
    const watchingDisabled = storedWatching ? true : false;
    const watchlistDisabled = storedWatchlist ? true : false;

    const [showLocation, setShowLocation] = useState(false);

    const movieList = status === "watched" ? watched : 
        status === "watching" ? watching : 
        watchlist;
    const index = movieList.findIndex(m => m.id === movie.id )
    
    const moveClick = e => {
        setShowLocation(showLocation => !showLocation);
    }
    
    return (
        <div className="inner-card-controls">
            {status === "watched" && 
                <>
                <div className="move-controls">
                    <button className="edit-btn"
                    onClick={() => {moveClick()}}>
                        <i className="fa-solid fa fa-ellipsis-v"></i>
                    </button>

                    {showLocation &&
                        <>
                        <button className="ctrl-btn"
                        disabled={watchingDisabled}
                        onClick={() => {
                            removeMovieFromWatched(movie.id);
                            addMovieToWatching(movie);
                            moveClick();
                        }}>
                            Watching
                        </button>

                        <button className="ctrl-btn"
                        disabled={watchlistDisabled}
                        onClick={() => {
                            removeMovieFromWatched(movie.id);
                            addMovieToWatchlist(movie);
                            moveClick();
                        }}>
                            Watchlist
                        </button>
                        </>
                    }
                </div>

                <button className="remove-btn"
                onClick={() => removeMovieFromWatched(movie.id)}>
                    <i className="fa-fw fa fa-times"></i>
                </button>
                
                <div className="move-btns">
                    <button className="move-btn"
                    onClick={() => moveMovie(status, movie.id, -1)}
                    disabled={index === 0}>
                        <i className="fa-solid fa fa-arrow-left"></i>
                    </button>

                    <button className="move-btn"
                    onClick={() => moveMovie(status, movie.id, 1)}
                    disabled={index === movieList.length - 1}>
                        <i className="fa-solid fa fa-arrow-right"></i>
                    </button>
                </div>
                </>
            }

            {status === "watching" && (
                <>
                <div className="move-controls">
                    <button className="edit-btn"
                    onClick={() => {moveClick()}}>
                        <i className="fa-solid fa fa-ellipsis-v"></i>
                    </button>

                    {showLocation &&
                        <>
                        <button className="ctrl-btn"
                        disabled={watchedDisabled}
                        onClick={() => {
                            removeMovieFromWatching(movie.id);
                            addMovieToWatched(movie);
                            moveClick();
                        }}>
                            Watched
                        </button>

                        <button className="ctrl-btn"
                        disabled={watchlistDisabled}
                        onClick={() => {
                            removeMovieFromWatching(movie.id);
                            addMovieToWatchlist(movie);
                            moveClick();
                        }}>
                            Watchlist
                        </button>
                        </>
                    }
                </div>

                <button className="remove-btn"
                onClick={() => removeMovieFromWatching(movie.id)}>
                    <i className="fa-fw fa fa-times"></i>
                </button>

                <div className="move-btns">
                    <button className="move-btn"
                    onClick={() => moveMovie(status, movie.id, -1)}
                    disabled={index === 0}>
                        <i className="fa-solid fa fa-arrow-left"></i>
                    </button>

                    <button className="move-btn"
                    onClick={() => moveMovie(status, movie.id, 1)}
                    disabled={index === movieList.length - 1}>
                        <i className="fa-solid fa fa-arrow-right"></i>
                    </button>
                </div>
                </>
            )}

            {status === "watchlist" && (
                <>
                <div className="move-controls">
                    <button className="edit-btn"
                    onClick={() => {moveClick()}}>
                        <i className="fa-solid fa fa-ellipsis-v"></i>
                    </button>

                    {showLocation &&
                        <>
                        <button className="ctrl-btn"
                        disabled={watchedDisabled}
                        onClick={() => {
                            removeMovieFromWatchlist(movie.id);
                            addMovieToWatched(movie);
                            moveClick();
                        }}>
                            Watched
                        </button>

                        <button className="ctrl-btn"
                        disabled={watchingDisabled}
                        onClick={() => {
                            removeMovieFromWatchlist(movie.id);
                            addMovieToWatching(movie);
                            moveClick();
                        }}>
                            Watching
                        </button>
                        </>
                    }
                </div>

                <button className="remove-btn"
                    onClick={() => removeMovieFromWatchlist(movie.id)}>
                        <i className="fa-fw fa fa-times"></i>
                </button>

                <div className="move-btns">
                    <button className="move-btn"
                    onClick={() => moveMovie(status, movie.id, -1)}
                    disabled={index === 0}>
                        <i className="fa-solid fa fa-arrow-left"></i>
                    </button>

                    <button className="move-btn"
                    onClick={() => moveMovie(status, movie.id, 1)}
                    disabled={index === movieList.length - 1}>
                        <i className="fa-solid fa fa-arrow-right"></i>
                    </button>
                </div>
                </>
            )}
        </div>
    )
}
