const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    case 'UNSET_MOVIES':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default moviesReducer;
