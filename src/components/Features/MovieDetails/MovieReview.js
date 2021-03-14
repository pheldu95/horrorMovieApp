import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Form, TextArea, Menu, Rating } from 'semantic-ui-react';

const MovieReview = ({movie}) => {
    const [reviewToggle, setReviewToggle] = useState(false);
    const [review, setReview] = useState();

    const submitReview = () => {
        console.log(review);
        
    }

    const toggleReview = () =>{
        setReviewToggle(!reviewToggle);
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
                    <Rating icon='star' defaultRating={10} maxRating={10} />
                    <Form.Group>
                        
                        <TextArea
                            placeholder=''
                            style={{ minHeight: 100, width: '50%' }}
                            onChange={(event) => setReview(event.target.value)}
                        />
                    </Form.Group>
                </Form>
            }
            
        </div>
    );
}
export default connect(mapStoreToProps)(MovieReview);
