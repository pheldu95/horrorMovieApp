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

function* getWatchList(action){
    let userId = action.payload.userId
    try{
        let movies = [];
        yield axios({
            method: 'GET',
            url: '/api/watchList'
            }).then((response) => {
                //get each movie from the movie db
                for(let movieId of response.data){
                    axios({
                        method: 'GET',
                        url: `/api/horror/details/${movieId}`
                    }).then((response) =>{
                        movies.push(response.data);
                    }).catch((error) => {
                        console.log(error);
                        alert(error);  
                    })  
                }

            }).catch((error) => {
                console.log(error);
                alert(error);
            })
    }catch(error){
        console.log('error getting watch list. in watchlist saga');
    }
    
}

function* watchListSaga() {
    yield takeLatest('ADD_TO_WATCH_LIST', addToWatchList);
    yield takeLatest('GET_WATCH_LIST', getWatchList);
}

export default watchListSaga;
