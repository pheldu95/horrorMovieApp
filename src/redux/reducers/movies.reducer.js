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
export default moviesReducer;
