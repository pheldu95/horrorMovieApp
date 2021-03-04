import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import axios from 'axios';
import { Button, Container, Divider } from 'semantic-ui-react';
import './MovieDetails.css';

//we take props so that we can get the movie id from the url. using match.params
const MovieDetails = (props) => {
  const [movieDetails, setMovieDetails] = useState();
  const [opac, setOpac] = useState();

  const getMovieDetails = () => {
    axios({
      method: 'GET',
      url: `/api/horror/details/${props.match.params.id}`
    }).then((response) => {
      setMovieDetails(response.data);
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }

  useEffect(() => {
    getMovieDetails();
  },[getMovieDetails])

  
  
  const addToWatchList = () => {
    props.dispatch({ 
      type: 'ADD_TO_WATCH_LIST', 
      payload: { movieId: movieDetails.id, userId: props.store.user.id } 
    })
  }

  //used to change the opacity of the background photo as the user scrolls down
  window.onscroll = function () {
    let opacityCoefficient = 80 / window.pageYOffset;
    if (opacityCoefficient < .2){
      opacityCoefficient = 0;
    }
    setOpac(opacityCoefficient);
  };

  return (
      <div className = 'standardContainer'>
        {movieDetails&&
          <div className='detailsContainer'>
            <div className='background'>
              <img 
                alt = "movie backdrop" 
                style={{ backgroundImage: `url("https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails.backdrop_path}"`, 
                opacity: opac }} 
              />
            </div>
            <Container textAlign='left'>
              <img 
                alt="movie poster" 
                className="poster" 
                src={'https://image.tmdb.org/t/p/w1280' + movieDetails.poster_path} 
              />
              <br/>
              <br/>
              <Button className="addToWatch" onClick={() => addToWatchList()}>Add to Watch List</Button>
            </Container>
            <Container textAlign='center'>{movieDetails.title}</Container>
            <Container textAlign='justified'>
              <b>{movieDetails.tagline}</b>
              <Divider />
              <p>
                {movieDetails.overview}
              </p>
            </Container>
          </div>
        }
      </div>
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MovieDetails);
