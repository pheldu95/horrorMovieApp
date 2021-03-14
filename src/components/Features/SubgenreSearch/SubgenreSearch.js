import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import MovieList from '../MovieList/MovieList';

const SearchResults = (props) => {
    const dispatch = useDispatch();
    const subgenreId = props.match.params.subgenreId;
    const movies = useSelector((state) => state.movies)
    useEffect(() => {
        console.log(subgenreId);
        
        dispatch({
            type: 'SUBGENRE_SEARCH',
            payload: subgenreId
        })
    }, [subgenreId, dispatch])

    return (
        <>
            <MovieList movies={movies} />
        </>

    );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SearchResults);
