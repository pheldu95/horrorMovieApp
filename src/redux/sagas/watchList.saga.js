import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//will send the move the user has added to their watchlist to the server
function* addToWatchList(action) {
    console.log(action.payload);
    try {
      yield axios({
          method: 'POST',
          url: `/api/watchlist`,
          data: action.payload
      })
    } catch (error) {
        console.log('error adding packing list items', error);
    }
}

function* watchListSaga() {
    yield takeLatest('ADD_TO_WATCH_LIST', addToWatchList);
}

export default watchListSaga;
