import React, {useState, useEffect} from 'react';
import { connect, useSelector, useDispatch} from 'react-redux';
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
  const [onWatchList, setOnWatchList] = useState(false);
  
  //use hook to get watchList and user from store
  const watchList = useSelector((state) => state.watchList)
  const user = useSelector((state) => state.user);
  //get dispatch functionality
  const dispatch = useDispatch()

  function watchListCheck(){
    let response = watchListChecker(movie.id, watchList)
    setOnWatchList(response);   
  }
  function showDetails(movieId) {
    history.push(`/details/${movieId}`);
  }

  const addToWatchList = () => {
    dispatch({
      type: 'ADD_TO_WATCH_LIST',
      payload: { movieId: movie.id, userId: user.id }
    });
    setOnWatchList(true);
  }
  const deleteFromWatchList = () => {
    dispatch({
      type: 'DELETE_FROM_WATCH_LIST',
      payload: { movieId: movie.id, userId: user.id }
    });
    setOnWatchList(false);
  }

  return (
    <div className='container' >
      <img className="img" src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} onClick={() => showDetails(movie.id)}/>
      <div className="overlay">
        <div className="text">
          {movie.title}
          <br/>
          {movie.vote_average}/10
          <br/>
          {onWatchList 
          
            ? <Button animated='fade' onClick={() => deleteFromWatchList()}>
                <Button.Content hidden>Remove</Button.Content>
                <ButtonContent visible>
                  <Icon name='check circle outline' />
                </ButtonContent>
              </Button>
            
            : <Button animated='fade' onClick={() => addToWatchList()}>
                <Button.Content hidden>Add</Button.Content>
                <ButtonContent visible>
                  <Icon name= 'eye'/>
                </ButtonContent>
              </Button>
          }
        </div>
       
      </div>
    </div>
    // <img className="poster" src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} />
    //   <div className="after">This is some content</div>
  );
}
export default connect(mapStoreToProps)(MovieCard);
