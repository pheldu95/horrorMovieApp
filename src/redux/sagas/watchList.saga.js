import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//will send the move the user has added to their watchlist to the server
function* addToWatchList(action) {
    try {
        yield axios({
            method: 'POST',
            url: `/api/watchlist`,
            data: action.payload
        });
        yield put({
            type: 'GET_WATCH_LIST',
        });
    } catch (error) {
        console.log('error adding packing list items', error);
    }
}

function* getWatchList(){
    try{
        let movies = [];
        let movie;
        const response = yield axios.get(`/api/watchList`);
        for(let movieId of response.data){
            movie = yield axios.get(`/api/horror/details/${movieId}`)
            movies.push(movie.data);
        }
        yield put({type: 'SET_WATCHLIST', payload: movies});
    }catch(error){
        console.log('error getting watch list. in watchlist saga');
    }
    
}

function* deleteFromWatchList(action){
    try {
        yield axios({
            method: 'DELETE',
            url: `/api/watchList`,
            data: action.payload
        });
        yield put({
            type: 'GET_WATCH_LIST',
        });
    }
    catch (error) {
        console.log(error);
        alert('Unable to delete move from watchlist');
    };      
}

function* watchListSaga() {
    yield takeLatest('ADD_TO_WATCH_LIST', addToWatchList);
    yield takeLatest('DELETE_FROM_WATCH_LIST', deleteFromWatchList);
    yield takeLatest('GET_WATCH_LIST', getWatchList);
}

export default watchListSaga;
