import React, {useState, useEffect} from 'react';
import { connect, useSelector } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './MovieCard.css';
import { useHistory } from "react-router-dom";
import { Button, ButtonContent, Icon } from 'semantic-ui-react';
import {watchListChecker} from '../../App/Common/watchListChecker';

const MovieCard = ({movie}) => {
  useEffect(() => {
    watchListCheck();
    //add the things we are using to the dependencies
  }, [])
  //in functional components, need useHistory to have accest to the usual this.props.history stuff
  const history = useHistory();
  const [onWatchList, setOnWatchList] = useState();
  
  //use hook to get watchList from store
  const watchList = useSelector((state) => state.watchList)
  function watchListCheck(){
    let response = watchListChecker(movie.id, watchList)
  }
  function showDetails(movieId) {
    history.push(`/details/${movieId}`);
  }
  return (
    <div className='container' onClick={() => showDetails(movie.id)}>
      <img className="img" src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} />
      <div className="overlay">
        <div className="text">
          {movie.title}
          <br/>
          {movie.vote_average}/10
          <br/>
          <Button animated='fade'>
            <Button.Content hidden>Add</Button.Content>
            <ButtonContent visible>
              <Icon name= 'eye'/>
            </ButtonContent>
          </Button>
        </div>
       
      </div>
    </div>
    // <img className="poster" src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} />
    //   <div className="after">This is some content</div>
  );
}
export default connect(mapStoreToProps)(MovieCard);
