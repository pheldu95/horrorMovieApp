import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { Menu, Feed } from 'semantic-ui-react';
import axios from 'axios';
import ReviewItem from './ReviewItem';

const MovieReviewsDisplay = ({movie}) => {
    const [activeItem, setActiveItem] = useState('popular reviews');
    const [popularReviews, setPopularReviews] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]);
    const user = useSelector((state) => state.user);

    const toggleReviewsView = (e, {name}) => {
        setActiveItem(name);
    }

    useEffect(() => {
        console.log('moviereviewsdisplay useeffect');
        getRecentReviews();
        getPopularReviews();
    }, [])

    const getRecentReviews = () =>{
        axios({
            method: 'GET',
            url: `/api/reviews/recent/${movie.id}`
        }).then((response) => {
            console.log(response.data.rows);
            
            setRecentReviews(response.data.rows);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }
     const getPopularReviews = () =>{
        axios({
            method: 'GET',
            url: `/api/reviews/popular/${movie.id}`
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
            {popularReviews.length > 0?
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
                                <ReviewItem review={review} />
                            )
                        })
                    }
                </Feed>
                : <b>Nobody has reviewed this movie yet.</b>
            }       
        </div>
    );
}
export default connect(mapStoreToProps)(MovieReviewsDisplay);
