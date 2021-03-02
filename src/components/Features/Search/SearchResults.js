import React, { useEffect, useState  } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import MovieCard from '../MovieCard/MovieCard';
import MovieList from '../MovieList/MovieList';
import Search from './Search';

const SearchResults = (props) => {
    const dispatch = useDispatch();
    // const [movies, setMovies] = useState();
    const movies = useSelector((state) => state.movies)
    useEffect(() => {
        let query = props.match.params.query;
        dispatch({
            type: 'SEARCH',
            payload: query
        })
    }, [])
    
    return (
        <>
            <Search/>
            <MovieList movies={movies} />
        </>
        
    );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SearchResults);
