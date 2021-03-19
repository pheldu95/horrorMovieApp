import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { Menu, Feed } from 'semantic-ui-react';
import axios from 'axios';
import ReviewItem from './ReviewItem';

const MovieReviewsDisplay = ({movie}) => {
    const [activeItem, setActiveItem] = useState('popular reviews');
    const [popularReviews, setPopularReviews] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]);
    const toggleReviewsView = (e, {name}) => {
        setActiveItem(name);
    }

    useEffect(() => {
        console.log('moviereviewsdisplay useeffect');
        getRecentReviews();
        getPopularReviews();
    }, [])

    const getRecentReviews = () =>{
        // axios({
        //     method: 'GET',
        //     url: `/api/reviews/${movieId}`
        // }).then((response) => {
        //     setMovieDetails(response.data);
        //     let year = response.data.release_date.substring(0, 4);
        //     setReleaseYear(year);
        // }).catch((error) => {
        //     console.log(error);
        //     alert(error);
        // })
    }
     const getPopularReviews = () =>{
        axios({
            method: 'GET',
            url: `/api/reviews/${movie.id}`
        }).then((response) => {
            setPopularReviews(response.data.rows);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
     }

    return (
        <div>
            <Menu inverted pointing secondary>
                <Menu.Item
                    name='popular reviews'
                    active= {activeItem === 'popular reviews'}
                    onClick={toggleReviewsView}
                    style={{ width: '20%' }}
                >
                    Popular Reviews
                </Menu.Item>
                <Menu.Item
                    name='recent reviews'
                    active={activeItem === 'recent reviews'}
                    onClick={toggleReviewsView}
                    style={{ width: '20%' }}
                >
                    Recent Reviews
                </Menu.Item>
            </Menu>
            <Feed>
                {activeItem === 'popular reviews' &&
                    popularReviews &&
                        popularReviews.map((review) => {
                            return(
                                <ReviewItem review={review}/>
                            )
                        })
                }
                {activeItem === 'recent reviews' &&
                    recentReviews &&
                    recentReviews.map((review) => {
                        return (
                            <ReviewItem />
                        )
                    })
                }
            </Feed>
        </div>
    );
}
export default connect(mapStoreToProps)(MovieReviewsDisplay);
