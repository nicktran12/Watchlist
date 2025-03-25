const appReducer = (state, action) => {
    switch(action.type) {
        case "ADD_MOVIE_TO_WATCHED":
            return {
                ...state,
                watched: [action.payload, ...state.watched]
            }

        case "ADD_MOVIE_TO_WATCHING":
            return {
                ...state,
                watching: [action.payload, ...state.watching]
        }

        case "ADD_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                watchlist: [action.payload, ...state.watchlist]
        }
        
        case "REMOVE_MOVIE_FROM_WATCHED":
            return {
                ...state,
                watched: state.watched.filter(movie => movie.id !== action.payload)
            }

        case "REMOVE_MOVIE_FROM_WATCHING":
            return {
                ...state,
                watching: state.watching.filter(movie => movie.id !== action.payload)
            }
        
        case "REMOVE_MOVIE_FROM_WATCHLIST":
            return {
                ...state,
                watchlist: state.watchlist.filter(movie => movie.id !== action.payload)
            }

        case "MOVE_MOVIE":
            const {listName, id, direction} = action.payload;
            const list = state[listName];
            
            const index = list.findIndex(movie => movie.id === id);
            const newIndex = index + direction
            if (index === -1 || newIndex < 0 || newIndex >= list.length) {
                return state
            }

            const updatedList = [...list];
            [updatedList[index], updatedList[newIndex]] = [updatedList[newIndex], updatedList[index]];

            return {
                ...state,
                [listName]: updatedList
            }

        default:
            return state;
    }
}

export default appReducer;