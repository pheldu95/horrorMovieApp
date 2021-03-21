import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { Form, TextArea, Menu, Rating, Button, Feed } from 'semantic-ui-react';
import axios from 'axios';
import ReviewItem from './ReviewItem';

const MovieReview = ({movie}) => {
    const [reviewToggle, setReviewToggle] = useState(false);
    const [review, setReview] = useState();
    const [score, setScore] = useState(5);
    const [userReview, setUserReview] = useState({});
    const user = useSelector((state) => state.user);

    useEffect(() => {
        console.log('movie review useeffect');
        getUserReview();
    }, [])

    const getUserReview = () => {
        axios({
            method: 'GET',
            url: `/api/reviews/${movie.id}/${user.id}`
        }).then((response) => {
            if (response.data.rows.length > 0){
                setUserReview(response.data.rows[0]);
            }
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }

    const deleteReview = () =>{
        axios({
            method: 'DELETE',
            url: `/api/reviews/${userReview.id}`
        }).then((response) => {
        
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
        setUserReview({});
    }

    const submitReview = () => {
        axios.post(`/api/reviews/${movie.id}`, { review: review, score: score, timestamp: Date().toLocaleString(), userId: user.id});
        setReviewToggle(false);
    }

    const toggleReview = () =>{
        setReviewToggle(!reviewToggle);
    }

    const handleRate = (e, { rating, maxRating }) =>{
        setScore(rating);
    }
    return (
        <div>
            {userReview.review
                ? <>
                    <p>Your review:</p>
                    <Feed>
                        <ReviewItem review={userReview} />
                        <Button color='red' size='mini' onClick={() => deleteReview()}>Delete</Button>
                    </Feed>
                  </>
                : <Menu inverted pointing secondary>
                    <Menu.Item
                        name='review'
                        active={review === true}
                        onClick={toggleReview}
                        style={{width:'20%'}}
                    >
                        Write a review
                    </Menu.Item>
                </Menu>
            }
            {reviewToggle&&
                <Form Form onSubmit={() => submitReview()}>
                    <Rating icon='star' defaultRating={10} maxRating={10} onRate = {handleRate}/>
                    <Form.Group> 
                        <TextArea
                            placeholder=''
                            style={{ minHeight: 100, width: '50%' }}
                            onChange={(event) => setReview(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button color='red' onClick={() => setReviewToggle(false)}>Cancel</Button>
                        <Button color='green'>Submit</Button>
                    </Form.Group>   
                </Form>
            }
            
        </div>
    );
}
export default connect(mapStoreToProps)(MovieReview);
