import React, {useState} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './MovieCard.css';
import { Card, Image } from 'semantic-ui-react';

const MovieCard = ({movie}) => {
  const[showTitle, setShowTitle] = useState(false);
  function showDetails(){

  }
  return (
      <div className='container'>
        {showTitle?
          <img 
            src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} 
            alt='movie poster' className='moviePoster' 
            onClick={() => showDetails()}
            onMouseEnter={() => setShowTitle(true)}
            onMouseLeave={() => setShowTitle(false)}
          />
        :
          <img
            src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path}
            alt='movie poster' className='showTitle'
            onClick={() => showDetails()}
            onMouseEnter={() => setShowTitle(true)}
            onMouseLeave={() => setShowTitle(false)}
          />
          // <div
          //   className = "showTitle"
          //   onClick={() => showDetails()}
          //   onMouseEnter={() => setShowTitle(true)}
          //   onMouseLeave={() => setShowTitle(false)}
          // style={{ backgroundImage: "url(" + "https://image.tmdb.org/t/p/w1280" + movie.poster_path + ")"}}
          // >
            
          //</div>
        } 
      </div>
    
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MovieCard);
