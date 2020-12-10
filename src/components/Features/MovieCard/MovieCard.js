import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './MovieCard.css';
import { Card, Image } from 'semantic-ui-react';

const MovieCard = ({movie}) => {
  
  return (
    <Image src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} alt='movie poster' className='moviePoster' wrapped ui={false} rounded/>
    // <Card className='movieCard'>
    //   <Image src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} alt='movie poster' className='moviePoster' wrapped ui={false} />
    //   <Card.Content>
    //     <Card.Header>Matthew</Card.Header>
    //     <Card.Meta>
    //       <span className='date'>Joined in 2015</span>
    //     </Card.Meta>
    //     <Card.Description>
    //         Matthew is a musician living in Nashville.
    //     </Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <a>
    //       <Icon name='user' />
    //       22 Friends
    //     </a>
    //   </Card.Content>
    // </Card> 
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MovieCard);
