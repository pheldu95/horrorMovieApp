import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';
import MovieList from '../Features/MovieList/MovieList';
import { Menu } from 'semantic-ui-react';
import Search from '../Features/Search/Search';
import { Button } from 'semantic-ui-react';

class UserPage extends Component {
  state ={
    movies: [],
    activeItem: 'popular',
    watchList: [],
    page: 0
  }
  componentDidMount(){
    this.getWatchList();
    //this.getPopHorror();
  }
  getPopHorror = (page) => {
    axios({
      method: 'GET',
      url: `/api/horror/popular/${page}`
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
    this.setState({
      page: page+1
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
      //we get the popular horror after we have the wathclist in the store. that way we can check if movies are on the watchlist
      this.getPopHorror(1);
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

  nextPage = () =>{
    this.props.history.push('/popular/2');
  }
  render() {
    let movies = this.state.movies;
    let watchList = this.state.watchList;
    const activeItem = this.state.activeItem;
    return (
      <div>
        {/* <Search/> */}
        <Menu inverted pointing secondary>
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
        {/* <LogOutButton className="log-in" /> */}
        <Button onClick={() => this.nextPage()}>Next</Button>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
