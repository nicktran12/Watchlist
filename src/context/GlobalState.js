import React, {createContext, useReducer, useEffect} from "react";
import AppReducer from "./AppReducer";

const initialState = {
    watched: localStorage.getItem("watched") ? JSON.parse(localStorage.getItem("watched")) : [],
    watching: localStorage.getItem("watching") ? JSON.parse(localStorage.getItem("watching")) : [],
    watchlist: localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist")) : [],
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(state.watched));
        localStorage.setItem("watching", JSON.stringify(state.watching));
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    }, [state])
    
    const addMovieToWatched = movie => {
        dispatch({type: "ADD_MOVIE_TO_WATCHED", payload: movie});
    }

    const addMovieToWatching = movie => {
        dispatch({type: "ADD_MOVIE_TO_WATCHING", payload: movie})
    }

    const addMovieToWatchlist = movie => {
        dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload: movie});
    }

    const removeMovieFromWatched = id => {
        dispatch({type: "REMOVE_MOVIE_FROM_WATCHED", payload: id});
    }

    const removeMovieFromWatching = id => {
        dispatch({type: "REMOVE_MOVIE_FROM_WATCHING", payload: id});
    }

    const removeMovieFromWatchlist = id => {
        dispatch({type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id})
    }

    return (
        <GlobalContext.Provider value = {{
                watched: state.watched,
                watching: state.watching,
                watchlist: state.watchlist,
                addMovieToWatched,
                addMovieToWatching,
                addMovieToWatchlist,
                removeMovieFromWatched,
                removeMovieFromWatching,
                removeMovieFromWatchlist
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}