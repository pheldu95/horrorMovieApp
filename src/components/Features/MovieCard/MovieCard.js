import React, {useState} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './MovieCard.css';
import { Card, Image } from 'semantic-ui-react';

const MovieCard = ({movie}) => {
  // const[showTitle, setShowTitle] = useState(false);
  function showDetails(){
    
  }
  return (
    <div className='container'>
      <img className="img" src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} />
      <div className="overlay">
        <div class="text">{movie.title}</div>
       
      </div>
    </div>
    // <img className="poster" src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} />
    //   <div className="after">This is some content</div>
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MovieCard);
