import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';
import MovieList from '../Features/MovieList/MovieList';

class UserPage extends Component {
  state ={
    movies: []
  }
  componentDidMount(){
    this.getPopHorror();
  }
  getPopHorror = () => {
    axios({
      method: 'GET',
      url: '/horror/popular'
    }).then((response) => {
      console.log(response);

      /*this.props.dispatch({
        type: 'SET_POP_HORROR',
        payload: response.data
      })*/
      console.log('response going to state:', response);
      this.setState({
        movies: response.data
      })

    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    let movies = this.state.movies;
    return (
      <div>
        {/* <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1> */}
        {movies&&
          <MovieList movies={movies}/>
        }
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
