import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import MovieList from '../MovieList/MovieList';
import axios from 'axios';
import LoaderModal from '../../Loader/LoaderModal';

const SearchResults = (props) => {
    const dispatch = useDispatch();
    const tagId = props.match.params.tagId;
    const [tagName, setTagName] = useState();
    const movies = useSelector((state) => state.movies)
    const loader = useSelector((state) => state.loader)
    useEffect(() => {
        console.log('tag search useeefect');
        dispatch({
            type: 'LOADING',
        })
        axios({
            method: 'GET',
            url: `/api/tags/tagTitle/${tagId}`
        }).then((response) => {
            setTagName(response.data.rows[0].name);
        }).catch((error) => {
            console.log('error getting tag name', error);
            alert(error);
        })
        dispatch({
            type: 'TAG_SEARCH',
            payload: tagId
        })
    }, [tagId, dispatch])

    if (loader) return <LoaderModal />
    return (
        <>
            <h1 style={{ textAlign: 'center'}}>{tagName}</h1>
            <MovieList movies={movies} />
        </>

    );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SearchResults);
