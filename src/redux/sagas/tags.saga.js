import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postTags(action) {
    console.log(action.payload);
    
    let tagIds = action.payload.tagIds;
    let movieId = action.payload.movieId;
    try {
        //or maybe do a get request? to check for tags in db. and then do the posting and putting?
        yield axios({
            method: 'POST',
            url: `/api/tags`,
            data: { tagIds: tagIds, movieId: movieId }
        });
        // yield put({
        //     type: 'GET_WATCH_LIST',
        // });
    }
    catch (error) {
        console.log(error);
        alert('Unable to add tags');
    };
}

function* tagSaga() {
    yield takeLatest('POST_TAGS', postTags);
}

export default tagSaga;
