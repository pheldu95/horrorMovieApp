import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { useHistory } from "react-router-dom";
import axios from 'axios';

//we take match so that we can get the movie id from the url. using match.params
const MovieDetails = (match) => {
  const history = useHistory();

  const [movieDetails, setMovieDetails] = useState();

  useEffect(() => {
    getMovieDetails();
  },[])

  const getMovieDetails = () => {
    axios({
      method: 'GET',
      url: `/horror/details/${match.match.params.id}`
    }).then((response) => {
      console.log(response);

      /*this.props.dispatch({
        type: 'SET_POP_HORROR',
        payload: response.data
      })*/
      console.log('response going to state:', response);
      setMovieDetails(response.data);

    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }
  return (
    <div className = 'standardContainer'>
      {JSON.stringify(movieDetails)}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MovieDetails);
