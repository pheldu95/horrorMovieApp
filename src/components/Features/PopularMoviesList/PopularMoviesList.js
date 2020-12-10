import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import MovieCard from '../MovieCard/MovieCard';

const PopularMoviesList = ({movie}) => {
  
  return (
    <MovieCard movie={movie}/>
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(PopularMoviesList);
