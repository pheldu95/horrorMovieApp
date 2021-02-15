import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';
import MovieList from '../Features/MovieList/MovieList';
import { Menu } from 'semantic-ui-react';
import Search from '../Features/Search/Search';

class UserPage extends Component {
  state ={
    movies: [],
    activeItem: 'popular',
    watchList: []
  }
  componentDidMount(){
    this.getPopHorror();
    this.getWatchList();
  }
  getPopHorror = () => {
    axios({
      method: 'GET',
      url: '/api/horror/popular'
    }).then((response) => {
      this.props.dispatch({
        type: 'SET_MOVIES',
        payload: response.data
      })
      // console.log('response going to state:', response);
      // this.setState({
      //   movies: response.data
      // })

    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }

  getWatchList = () =>{
    this.props.dispatch({ 
       type: 'GET_WATCH_LIST', 
       payload: { userId: this.props.store.user.id } 
    })
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.store.movies !== prevProps.store.movies) { 
        this.setState({
            movies: this.props.store.movies
        })
      }
    if (this.props.store.watchList !== prevProps.store.watchList) {
      this.setState({
        watchList: this.props.store.watchList
      })
    }
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
  render() {
    let movies = this.state.movies;
    let watchList = this.state.watchList;
    const activeItem = this.state.activeItem;
    return (
      <div>
        <Search/>
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
        {activeItem === 'popular'&&
          movies&&
          <MovieList movies={movies}/>
        }
        {activeItem === 'watch list' &&
          watchList &&
          <MovieList movies={watchList} />
        }
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
