import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { Menu } from 'semantic-ui-react';
import axios from 'axios';

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
            {activeItem === 'popular reviews' &&
                popularReviews &&
                JSON.stringify(popularReviews[0])
            }
            {activeItem === 'recent reviews' &&
                recentReviews &&
                JSON.stringify(recentReviews[0])
            }

        </div>
    );
}
export default connect(mapStoreToProps)(MovieReviewsDisplay);
