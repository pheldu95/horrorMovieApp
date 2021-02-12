const watchListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_WATCHLIST':
            return action.payload;
        case 'UNSET_WATCHLIST':
            return [];
        default:
            return state;
    }
};
export default watchListReducer;
