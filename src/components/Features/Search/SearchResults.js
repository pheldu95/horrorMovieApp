import React, { useEffect  } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import MovieList from '../MovieList/MovieList';
import LoaderModal from '../../Loader/LoaderModal';

const SearchResults = (props) => {
    const dispatch = useDispatch();
    const query = props.match.params.query;
    const movies = useSelector((state) => state.movies)
    const loader = useSelector((state) => state.loader)
    useEffect(() => {
        console.log('searchresults useeffect');
        console.log(props);
        
        dispatch({
            type: 'SEARCH',
            payload: query
        })
    }, [query, dispatch])

    if (loader) return <LoaderModal/>

    return (
        <>
            {/* <Search/> */}
            <MovieList movies={movies} />
        </>
        
    );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(SearchResults);
