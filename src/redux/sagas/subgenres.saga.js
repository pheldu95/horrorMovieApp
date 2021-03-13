import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* upSubgenreCounts(action) {
    console.log('subgenres to up count', action.payload);
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
    console.log('new subgenres', action.payload);
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

function* subgenreSaga() {
    yield takeLatest('UP_SUBGENRE_COUNTS', upSubgenreCounts);
    yield takeLatest('POST_NEW_SUBGENRES', postNewSubgenres);
}

export default subgenreSaga;
