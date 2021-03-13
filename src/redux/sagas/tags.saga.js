import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postTags(action) {
    // console.log(action.payload);
    // //we will remove all existing tags from tagIds, and add them to a new array called tagsToUpCount
    // //for tagIds, we will send a post, for tagsToUpCount we will send a put to up their count
    // let tagIds = action.payload.tagIds;
    // let movieId = action.payload.movieId;
    // let tagsToUpCount = [];
    // try {
    //     const response = yield axios({
    //         method: 'GET',
    //         url: `/api/tags/${movieId}`,
    //     });
    //     let existingTags = response.data.rows;
    //     for(let i = 0; i < tagIds.length; i++){
    //         let tagExists = false;
    //         for(let existingTag of existingTags){
    //             if(tagIds[i] === existingTag.id){
    //                 tagExists = true;
    //             }
    //         }
    //         if(tagExists){
    //             tagsToUpCount.push(tagIds[i]);
    //             tagIds.splice(i, 1);
    //         }
    //     }
    //     console.log(tagsToUpCount);
    //     console.log(tagIds);
        
    //     //now we do a post for new tags if there are any
    //     // and a put for existing tags
        
    //     // yield axios({
    //     //     method: 'POST',
    //     //     url: `/api/tags`,
    //     //     data: { tagIds: tagIds, movieId: movieId }
    //     // });
    //     // yield put({
    //     //     type: 'GET_WATCH_LIST',
    //     // });
    // }
    // catch (error) {
    //     console.log(error);
    //     alert('Unable to add tags');
    // };
}
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
