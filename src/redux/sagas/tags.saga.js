import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* upTagCounts(action) {
    let tags = action.payload.tags;
    let movieId = action.payload.movieId;
    for(let tag of tags){
        try{
            yield axios({
                method: 'PUT',
                url: `/api/tags/${movieId}`,
                data: {tag: tag}
            })
        }catch(error){
            console.log('error while upping a tag count');
        }
    }
}
function* postNewTags(action) {
    console.log('newtags', action.payload);
    let tags = action.payload.tags;
    let movieId = action.payload.movieId;
    for (let tag of tags) {
        try {
            yield axios({
                method: 'POST',
                url: `/api/tags/${movieId}`,
                data: { tag: tag }
            })
        } catch (error) {
            console.log('error could not post tag');
        }
    }
}

function* tagSaga() {
    // yield takeLatest('POST_TAGS', postTags);
    yield takeLatest('UP_TAG_COUNTS', upTagCounts);
    yield takeLatest('POST_NEW_TAGS', postNewTags);
}

export default tagSaga;
