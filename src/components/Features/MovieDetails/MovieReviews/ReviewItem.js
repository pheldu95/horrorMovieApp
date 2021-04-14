import React, {useEffect, useState} from 'react';
import { connect, useSelector } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { Feed, Statistic } from 'semantic-ui-react';
import axios from 'axios';
import imageSrc from '../../../../assets/default-user-image.png'

const ReviewItem = ({ review }) => {
    const user = useSelector((state) => state.user);
    const [upvoteCount, setUpvoteCount] = useState();

    useEffect(() => {
       console.log('reviewitem useEffect');
       getUpvotes();
    }, [getUpvotes]);

    const getUpvotes = () => {
        console.log(review.id);
        let id = review.id;
        axios({
            method: 'GET',
            url: `/api/upvotes/upvoteCount/${id}`
        }).then((response) => {
            console.log(response.data);
            setUpvoteCount(response.data);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }

    const handleDownVote = () =>{
        axios({
            method: 'POST',
            url: `/api/upvotes/down/${review.id}`,
            data: { userId: user.id, timestamp: Date().toLocaleString() }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
        setUpvoteCount(upvoteCount - 1);
    }
    const handleUpVote = () => {
        axios({
            method: 'POST',
            url: `/api/upvotes/up/${review.id}`,
            data: { userId: user.id, timestamp: Date().toLocaleString() }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
        //getUpvotes();
        setUpvoteCount(upvoteCount + 1);
    }
    return (
        <Feed.Event>
            <Feed.Label image={imageSrc} />
            <Feed.Content >
                <Feed.Date style={{ color: '#b90e0a' }}>{review.username}</Feed.Date>
                <Feed.Summary style={{ color:'#f8f8f8'}}>
                    {review.review}{upvoteCount}
                    {/* {upvoteCount} */}
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
