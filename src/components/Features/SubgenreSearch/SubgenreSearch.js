import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import MovieList from '../MovieList/MovieList';
import axios from 'axios';
import LoaderModal from '../../Loader/LoaderModal';

const SearchResults = (props) => {
    const dispatch = useDispatch();
    const subgenreId = props.match.params.subgenreId;
    const [subgenreName, setSubgenreName] = useState();
    const movies = useSelector((state) => state.movies);
    const loader = useSelector((state) => state.loader)
    useEffect(() => {
        console.log('subgenre search useeefect');
        //will send the loaded dispatch from the subgenre saga
        dispatch({
            type: 'LOADING',
        })
        axios({
            method: 'GET',
            url: `/api/subgenres/subgenreTitle/${subgenreId}`
        }).then((response) => {
            setSubgenreName(response.data.rows[0].name); 
        }).catch((error) => {
            console.log('error getting subgenre name', error);
            alert(error);
        })
        dispatch({
            type: 'SUBGENRE_SEARCH',
            payload: subgenreId
        })
    }, [subgenreId, dispatch])
    if (loader) return <LoaderModal />
    return (
        <>
            <h1 style={{ textAlign: 'center'}}>{subgenreName}</h1>
            <MovieList movies={movies} />
        </>

    );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SearchResults);
