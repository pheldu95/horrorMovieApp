import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import MovieCard from '../MovieCard/MovieCard';

const MovieList = ({movies}) => {
  console.log(movies);
  
  return (
    <Grid centered className='movieGrid'>
      {movies.map((movie) => {
        return (
          // <Grid.Column >
            <MovieCard className='movieCard' movie={movie} />
          // </Grid.Column>
        )
      })}
    </Grid>
  );
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MovieList);
