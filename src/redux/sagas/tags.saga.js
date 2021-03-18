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

function* getTagMovies(action) {
    let tagId = action.payload;
    let response = yield axios.get(`/api/tags/getTagMovies/${tagId}`);
    let tagMovies = response.data.rows;
    let moviesToSendToReducer = [];
    for (const movie of tagMovies) {
        response = yield axios.get(`/api/horror/details/${movie.movie_id}`);
        moviesToSendToReducer.push(response.data);
    }
    yield put({ type: 'SET_MOVIES', payload: moviesToSendToReducer });
}

function* tagSaga() {
    // yield takeLatest('POST_TAGS', postTags);
    yield takeLatest('UP_TAG_COUNTS', upTagCounts);
    yield takeLatest('POST_NEW_TAGS', postNewTags);
    yield takeLatest('TAG_SEARCH', getTagMovies);
}

export default tagSaga;
