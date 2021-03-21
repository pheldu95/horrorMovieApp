import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* upSubgenreCounts(action) {
    let subgenres = action.payload.subgenres;
    let movieId = action.payload.movieId;
    for (let subgenre of subgenres) {
        try {
            yield axios({
                method: 'PUT',
                url: `/api/subgenres/${movieId}`,
                data: { subgenre: subgenre }
            })
        } catch (error) {
            console.log('error while upping a subgenre count');
        }
    }
}
function* postNewSubgenres(action) {
    let subgenres = action.payload.subgenres;
    let movieId = action.payload.movieId;
    for (let subgenre of subgenres) {
        try {
            yield axios({
                method: 'POST',
                url: `/api/subgenres/${movieId}`,
                data: { subgenre: subgenre }
            })
        } catch (error) {
            console.log('error could not post subgenre');
        }
    }
}

function* getSubgenreMovies(action){
    let subgenreId = action.payload;
    let response = yield axios.get(`/api/subgenres/getSubgenreMovies/${subgenreId}`);
    let subgenreMovies = response.data.rows;
    let moviesToSendToReducer = [];
    for (const movie of subgenreMovies) {
        response = yield axios.get(`/api/horror/details/${movie.movie_id}`);
        moviesToSendToReducer.push(response.data);
    }
    yield put({ type: 'SET_MOVIES', payload: moviesToSendToReducer });
    yield put({type: 'LOADED' });
}

function* subgenreSaga() {
    yield takeLatest('UP_SUBGENRE_COUNTS', upSubgenreCounts);
    yield takeLatest('POST_NEW_SUBGENRES', postNewSubgenres);
    yield takeLatest('SUBGENRE_SEARCH', getSubgenreMovies);
}

export default subgenreSaga;
