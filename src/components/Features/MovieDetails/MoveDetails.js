import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
// import './MovieCard.css';
import { useHistory } from "react-router-dom";

//we take match so that we can get the movie id from the url. using match.params
const MovieDetails = (match) => {
  const history = useHistory();
  useEffect(() => {
    
  })
  return (
    <div className = 'standardContainer'>
      {JSON.stringify(match.match.params.id)}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MovieDetails);
