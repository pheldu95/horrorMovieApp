import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* search(action){
    let query = action.payload
    try{
        let response = yield axios.get(`/api/horror/search/${query}/1`);
        let horrorMovies = [];
        let pages = response.data.total_pages;
        for (let i = 1; i < pages; i++) {
            let page = i;
            response = yield axios.get(`/api/horror/search/${query}/${page}`)

            for(let movie of response.data.results){
                for(let genre of movie.genre_ids){
                    if(genre === 27){
                        horrorMovies.push(movie);
                    }
                }  
            }
        }
        console.log(horrorMovies);
        
        yield put({ type: 'SET_MOVIES', payload: horrorMovies });
    }catch(error){
        console.log(error);
    }
}
function* searchSaga() {
    yield takeLatest('SEARCH', search);
}

export default searchSaga;
