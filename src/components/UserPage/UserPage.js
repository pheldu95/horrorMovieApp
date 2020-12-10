import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';
import MovieList from '../Features/MovieList/MovieList';
import { Menu } from 'semantic-ui-react';

class UserPage extends Component {
  state ={
    movies: [],
    activeItem: 'popular'
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

  getWatchList = () =>{
    this.setState({
      movies: []
    })
  }

  //changes which tab is the 'active' tab
  handleMenuItemClick = (event, { name }) => {
    if(name === 'popular'){
      this.getPopHorror();
    }else if(name === 'watch list'){
      this.getWatchList();
    }
    
    this.setState({ activeItem: name })

  }
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    let movies = this.state.movies;
    const activeItem = this.state.activeItem;
    return (
      <div>
        <Menu tabular>
          <Menu.Item
            name='popular'
            active={activeItem === 'popular'}
            onClick={this.handleMenuItemClick}
          />
          <Menu.Item
            name='watch list'
            active={activeItem === 'watch list'}
            onClick={this.handleMenuItemClick}
          />
        </Menu>
        {/* <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1> */}
        {activeItem === 'popular'&&
          movies&&
          <MovieList movies={movies}/>
        }
        {activeItem === 'watch list' &&
          movies &&
          <MovieList movies={movies} />
        }
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
