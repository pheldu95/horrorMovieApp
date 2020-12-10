import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import axios from 'axios';
import PopularMoviesList from '../Features/PopularMoviesList/PopularMoviesList';

class UserPage extends Component {
  state ={
    popHoror: []
  }
  componentDidMount(){
    this.getHorror();
  }
  getHorror = () => {
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
        popHorror: response.data
      })

    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    let popHorror = this.state.popHorror;
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        {popHorror&&
          popHorror.map((movie) => {
                return (
                  <PopularMoviesList movie={movie} />
                )
              })
        }
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
