import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { Form, TextArea, Menu, Rating, Button } from 'semantic-ui-react';
import axios from 'axios';

const MovieReview = ({movie}) => {
    const [reviewToggle, setReviewToggle] = useState(false);
    const [review, setReview] = useState();
    const [score, setScore] = useState(5);
    const user = useSelector((state) => state.user);

    const submitReview = () => {
        console.log(movie);
        
        axios.post(`/api/reviews/${movie.id}`, { review: review, score: score, timestamp: Date().toLocaleString(), userId: user.id});
    }

    const toggleReview = () =>{
        setReviewToggle(!reviewToggle);
    }

    const handleRate = (e, { rating, maxRating }) =>{
        setScore(rating);
    }
    return (
        <div>
            <Menu inverted pointing secondary>
                <Menu.Item
                    name='review'
                    active={review === true}
                    onClick={toggleReview}
                    style={{width:'20%'}}
                >
                    Write a review
                </Menu.Item>
            </Menu>
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
