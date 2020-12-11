import React, {useState} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './MovieCard.css';
import { useHistory } from "react-router-dom";

const MovieCard = ({movie}) => {
  //const[showTitle, setShowTitle] = useState(false);
  //in functional components, need useHistory to have accest to the usual this.props.history stuff
  const history = useHistory();
  function showDetails(movieId){
    console.log(movieId);
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
        </div>
       
      </div>
    </div>
    // <img className="poster" src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} />
    //   <div className="after">This is some content</div>
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MovieCard);
