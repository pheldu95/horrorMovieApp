import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { Feed, Statistic } from 'semantic-ui-react';
import axios from 'axios';
import imageSrc from '../../../../assets/default-user-image.png'

const ReviewItem = ({ review }) => {
    const user = useSelector((state) => state.user);
    const handleDownVote = () =>{
        axios({
            method: 'POST',
            url: `/api/reviews/downvote/${review.id}`,
            data: { userId: user.id, timestamp: Date().toLocaleString() }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }
    const handleUpVote = () => {
        axios({
            method: 'POST',
            url: `/api/reviews/upvote/${review.id}`,
            data: { userId: user.id, timestamp: Date().toLocaleString() }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }
    return (
        <Feed.Event>
            <Feed.Label image={imageSrc} />
            <Feed.Content >
                <Feed.Date style={{ color: '#b90e0a' }}>{review.username}</Feed.Date>
                <Feed.Summary style={{ color:'#f8f8f8'}}>
                    {review.review}{review.votes}
                    <button onClick = {() => handleDownVote()}>down</button>
                    <button onClick={() => handleUpVote()}>up</button>
                    <Statistic.Group size='mini'>
                        <Statistic inverted >
                            <Statistic.Value>{review.score}/10</Statistic.Value>
                        </Statistic>
                    </Statistic.Group>
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
    );
}
export default connect(mapStoreToProps)(ReviewItem);
