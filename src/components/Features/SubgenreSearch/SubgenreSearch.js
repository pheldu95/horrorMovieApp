import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import MovieList from '../MovieList/MovieList';
import axios from 'axios';

const SearchResults = (props) => {
    const dispatch = useDispatch();
    const subgenreId = props.match.params.subgenreId;
    const [subgenreName, setSubgenreName] = useState();
    const movies = useSelector((state) => state.movies)
    useEffect(() => {
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

    return (
        <>
            <h1 style={{ textAlign: 'center'}}>{subgenreName}</h1>
            <MovieList movies={movies} />
        </>

    );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SearchResults);
