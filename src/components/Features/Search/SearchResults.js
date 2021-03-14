import React, { useEffect  } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import MovieList from '../MovieList/MovieList';

const SearchResults = (props) => {
    const dispatch = useDispatch();
    const query = props.match.params.query;
    const movies = useSelector((state) => state.movies)
    useEffect(() => {
        console.log('searchresults useeffect');
        
        dispatch({
            type: 'SEARCH',
            payload: query
        })
    }, [query, dispatch])
    
    return (
        <>
            {/* <Search/> */}
            <MovieList movies={movies} />
        </>
        
    );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SearchResults);
