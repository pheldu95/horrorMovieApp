import React, { useState, useEffect} from 'react';
import { connect, useSelector } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import axios from 'axios';
import { Button, Container, Divider, Statistic } from 'semantic-ui-react';
import './MovieDetails.css';
import MovieReview from './MovieReviews/MovieReview';
import Tags from './Tags/Tags';
import Subgenres from './Subgenres/Subgenres';
import { watchListChecker } from '../../App/Common/watchListChecker';
import MovieReviewsDisplay from './MovieReviews/MovieReviewsDisplay';
import LoaderModal from '../../Loader/LoaderModal';


//we take props so that we can get the movie id from the url. using match.params
const MovieDetails = (props) => {
  const movieId = props.match.params.id;
  const [movieDetails, setMovieDetails] = useState();
  const [releaseYear, setReleaseYear]  = useState();
  const [opac, setOpac] = useState();
  const [onWatchList, setOnWatchList] = useState(false);
  const watchList = useSelector((state) => state.watchList)
  const loader = useSelector((state) => state.loader)

  const getMovieDetails = () => {
    props.dispatch({
      type: 'LOADING'
    });
    axios({
      method: 'GET',
      url: `/api/horror/details/${movieId}`
    }).then((response) => {
      setMovieDetails(response.data);
      let year = response.data.release_date.substring(0, 4);
      setReleaseYear(year);
      props.dispatch({
        type: 'LOADED'
      });
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
    
  }

  const watchListCheck = () => {
    let response = watchListChecker(movieId, watchList);
    setOnWatchList(response);
  }

  useEffect(() => {
    console.log('details useffect');
    
    getMovieDetails();
    watchListCheck();
  }, [])

  

  const addToWatchList = () => { 
    props.dispatch({ 
      type: 'ADD_TO_WATCH_LIST', 
      payload: { movieId: movieDetails.id, userId: props.store.user.id } 
    })
    setOnWatchList(true);
  }

  const deleteFromWatchList = () => {
    console.log(onWatchList);
    props.dispatch({
      type: 'DELETE_FROM_WATCH_LIST',
      payload: { movieId: movieDetails.id, userId: props.store.user.id }
    });
    setOnWatchList(false);
  }

  //used to change the opacity of the background photo as the user scrolls down
  window.onscroll = function () {
    let opacityCoefficient = 80 / window.pageYOffset;
    if (opacityCoefficient < .2){
      opacityCoefficient = 0;
    }
    setOpac(opacityCoefficient);
  };

  if (loader) return <LoaderModal />
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
              {onWatchList
                ? <Button className="addToWatch" onClick={() => deleteFromWatchList()}>Remove from Watch List</Button>
                : <Button className="addToWatch" onClick={() => addToWatchList()}>Add to Watch List</Button>
              }
              <Statistic.Group size='mini'>
                <Statistic inverted >
                  <Statistic.Value>{movieDetails.vote_average}/10</Statistic.Value>
                  <Statistic.Label>Rating</Statistic.Label>
                </Statistic>
                <Statistic inverted >
                  <Statistic.Value>{movieDetails.vote_count}</Statistic.Value>
                  <Statistic.Label>Votes</Statistic.Label>
                </Statistic>
              </Statistic.Group>
              
            </Container>
            <Container textAlign='center'>
            <h1 style={{ fontFamily: 'TiemposHeadlineWeb-Bold' }}>{movieDetails.title}<h4>{releaseYear}</h4></h1>
            </Container>
            <Container textAlign='justified'>
              <b>{movieDetails.tagline}</b>
              <Divider/>
              <p>
                {movieDetails.overview}
              </p>
              <p>Runtime: {movieDetails.runtime} minutes</p>
              <u>Subgenres:</u> 
              <br/>
              <Subgenres movie={movieDetails}/>
              <Tags movie={movieDetails} />
              <br/>
              <br/>
              <Divider />
              <MovieReview movie={movieDetails} />
              <MovieReviewsDisplay movie={movieDetails}/>
            </Container>
            {/* {JSON.stringify(movieDetails)} */}
          </div>
        }
      </div>
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MovieDetails);
