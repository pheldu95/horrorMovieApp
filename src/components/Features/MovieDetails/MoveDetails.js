import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Button, Container, Divider } from 'semantic-ui-react'

//we take props so that we can get the movie id from the url. using match.params
const MovieDetails = (props) => {
  const history = useHistory();

  const [movieDetails, setMovieDetails] = useState();

  useEffect(() => {
    getMovieDetails();
  },[])

  const getMovieDetails = () => {
    axios({
      method: 'GET',
      url: `/api/horror/details/${props.match.params.id}`
    }).then((response) => {
      console.log(response);
      console.log('response going to state:', response);
      setMovieDetails(response.data);

    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }
  
  const addToWatchList = () => {
    console.log(props);
    props.dispatch({ 
      type: 'ADD_TO_WATCH_LIST', 
      payload: { movieId: movieDetails.id, userId: props.store.user.id } 
    })
  }
  return (
      <div className = 'standardContainer'>
        {movieDetails&&
          <>
            <Container textAlign='left'>
              <img className="img" src={'https://image.tmdb.org/t/p/w1280' + movieDetails.poster_path} />
              <Button onClick={() => addToWatchList()}>Add to Watch List</Button>
            </Container>
            <Container textAlign='center'>Center Aligned</Container>
            <Container textAlign='justified'>
              <b>{movieDetails.tagline}</b>
              <Divider />
              <p>
                {movieDetails.overview}
              </p>
              <p>{JSON.stringify(movieDetails)}</p>
            </Container>
          </>
        }
      </div>
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MovieDetails);
