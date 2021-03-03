import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* search(action){
    let query = action.payload
    try{
        const response = yield axios.get(`/api/horror/search/${query}/1`);
        let pages = response.data.total_pages;
        console.log(pages);
        
        yield put({ type: 'SET_MOVIES', payload: response.data.results });
        /*axios({
            method: 'GET',
            url: `/api/horror/search/${query}`,
        }).then((response) => {
            dispatch({
                type: 'SET_MOVIES',
                payload: response.data
            });
        }).catch((error) => {
            console.log(error);
            alert(error);
        })*/
    }catch{
    
    }
}
function* searchSaga() {
    yield takeLatest('SEARCH', search);
}

export default searchSaga;
