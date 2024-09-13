import React, {useContext} from 'react';
import {GlobalContext} from "../context/GlobalState";

export const TVCard = ({tv}) => {
    const {addMovieToWatchlist, watchlist} = useContext(GlobalContext);
    const {addMovieToWatched, watched} = useContext(GlobalContext);

    let storedWatchlist = watchlist.find(o => o.id === tv.id);
    let storedWatched = watched.find(o => o.id === tv.id)

    const watchlistDisabled = storedWatchlist ? true : false;
    const watchedDisabled = storedWatched ? true : false;

    return (
        <div className="result-card">
            <div className="poster-wrapper">
                {tv.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
                    alt={`${tv.title} Poster`}
                    />
                ) :(
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
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchlist(tv)}>
                        Add to Watchlist
                    </button>
                    <button className="btn"
                    disabled={watchedDisabled}
                    onClick={() => addMovieToWatched(tv)}>
                        Add to Watched
                    </button>
                </div>
            </div>
        </div>
    )
}
