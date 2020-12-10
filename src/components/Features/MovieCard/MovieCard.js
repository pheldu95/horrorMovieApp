import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

const MovieCard = ({movie}) => {
  
  return (
    <div>
      <img src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} alt='movie poster' style={{ width: "200px" }} />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MovieCard);
