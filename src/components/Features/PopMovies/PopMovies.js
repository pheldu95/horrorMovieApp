import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import axios from 'axios';
import MovieList from '../MovieList/MovieList';
import { Menu } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import LoaderModal from '../../Loader/LoaderModal';

class MoviesView extends Component {
    state = {
        movies: [],
        activeItem: 'popular',
        watchList: [],
        page: this.props.match.params.page
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'LOADING',
        })
        this.getWatchList();
        this.setState({
            page: this.props.match.params.page
        });
        
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
            this.props.dispatch({
                type: 'LOADED',
            });
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }

    getWatchList = () => {
        this.props.dispatch({
            type: 'GET_WATCH_LIST',
            payload: { userId: this.props.store.user.id }
        })
        this.getPopHorror(Number(this.state.page));
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
            //this.getPopHorror(this.state.page);
        }
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    //changes which tab is the 'active' tab
    handleMenuItemClick = (event, { name }) => {
        if (name === 'popular') {
            this.getPopHorror();
        } else if (name === 'watch list') {
            this.getWatchList();
        }
        this.setState({ activeItem: name })
    }

    nextPage = () =>{
        this.props.dispatch({
            type: 'LOADING',
        })
        let next = Number(this.props.match.params.page) + 1;
        this.setState({
            page: next
        })
        this.props.history.push(`/popular/${next}`);
        //do i need to get watch list again?
        this.props.dispatch({
            type: 'GET_WATCH_LIST',
            payload: { userId: this.props.store.user.id }
        })
        this.getPopHorror(next);
    }

    lastPage = () =>{
        let back = Number(this.props.match.params.page) - 1;
        if(back > 0){
            this.setState({
                page: back
            })
            this.props.history.push(`/popular/${back}`);
            //do i need to get watch list again?
            this.props.dispatch({
                type: 'GET_WATCH_LIST',
                payload: { userId: this.props.store.user.id }
            })
            this.getPopHorror(back);
        }
    }

    render(

    ) {
        let movies = this.state.movies;
        let watchList = this.state.watchList;
        const activeItem = this.state.activeItem;
        if (this.props.store.loader) return <LoaderModal />
        return (
            <div>
                <Button onClick={() => this.lastPage()}>Back</Button>
                <br/>
                <br/>
                {/* <Search /> */}
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
                {activeItem === 'popular' &&
                    movies &&
                    <MovieList movies={movies} />
                }
                {activeItem === 'watch list' &&
                    watchList &&
                    <MovieList movies={watchList} />
                }
                {/* <LogOutButton className="log-in" /> */}
                <Button onClick={() => this.lastPage()}>Back</Button>
                <Button onClick={() => this.nextPage()}>Next</Button>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(MoviesView);
