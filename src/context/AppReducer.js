export default (state, action) => {
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

        default:
            return state;
    }
}