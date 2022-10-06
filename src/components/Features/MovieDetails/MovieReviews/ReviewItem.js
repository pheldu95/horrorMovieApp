import React, {useEffect, useState} from 'react';
import { connect, useSelector } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { Feed, Statistic } from 'semantic-ui-react';
import axios from 'axios';
import imageSrc from '../../../../assets/default-user-image.png'
import '../MovieDetails.css';

const ReviewItem = ({ review }) => {
    const user = useSelector((state) => state.user);
    const [upvoteCount, setUpvoteCount] = useState();
    const [userVote, setUserVote] = useState();

    useEffect(() => {
       console.log('reviewitem useEffect');
       getUpvotes();
       getUserVote();
    }, [getUpvotes]);

    const getUpvotes = () => {
        let id = review.id;
        axios({
            method: 'GET',
            url: `/api/upvotes/upvoteCount/${id}`
        }).then((response) => {
            // console.log(response.data);
            setUpvoteCount(response.data);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }

    const getUserVote = () => {
        let id = review.id;
        axios({
            method: 'GET',
            url: `/api/upvotes/userVote/${id}`
        }).then((response) => {
            console.log(response.data);
            if(response.data.length === 0){
                setUserVote(0);
            }else{
                setUserVote(response.data[0].vote);
            }
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }

    const handleDownVote = () =>{
        deleteUserVote();
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
        if (userVote === 1) {
            setUpvoteCount(upvoteCount - 2);
        } else {
            setUpvoteCount(upvoteCount - 1);
        }
        setUserVote(-1);
    }
    const handleUpVote = () => {
        deleteUserVote();
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
        if(userVote === -1){
            setUpvoteCount(upvoteCount + 2);
        }else{
            setUpvoteCount(upvoteCount + 1);
        }
        setUserVote(1);
    }

    const resetVote = (operation) => {
        deleteUserVote();
        if(operation === 'plusOne'){
            setUpvoteCount(upvoteCount + 1);
        } else if(operation === 'minusOne'){
            setUpvoteCount(upvoteCount - 1);
        }
        setUserVote(0);
    }

    const deleteUserVote = () => {
        axios({
            method: 'DELETE',
            url: `/api/upvotes/delete/${review.id}`,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            alert(error);
        });
    }

    return (
        <Feed.Event>
            <Feed.Label image={imageSrc} />
            <Feed.Content >
                <Feed.Date style={{ color: '#b90e0a' }}>{review.username}</Feed.Date>
                <Feed.Summary style={{ color:'#f8f8f8'}}>
                    {review.review}
                    <Statistic.Group size='mini'>
                        <Statistic inverted >
                            <Statistic.Value>{review.score}/10</Statistic.Value>
                        </Statistic>
                    </Statistic.Group>
                    {/* {upvoteCount} */}
                    <div className='voteContainer'>
                        <div class='upvoteCount'>{upvoteCount}</div>
                        <div style={{ float: 'left', display: 'inline', width: '5%' }}>
                            <div>
                                {userVote === 1 && user.id != review.user_id ?
                                    user.id != review.user_id && <button className='upvote' style={{ color: 'red' }} onClick={() => resetVote('minusOne')}>up</button>
                                    : user.id != review.user_id && <button className='upvote' onClick={() => handleUpVote()}>up</button>
                                }
                            </div>
                            <div>
                                {userVote === -1 ?
                                    user.id != review.user_id && <button className = 'downvote' style={{ color: 'blue' }} onClick={() => resetVote('plusOne')}>down</button>
                                    : user.id != review.user_id && <button className='downvote' onClick={() => handleDownVote()}>down</button>
                                }
                            </div>
                        </div>
                        {/* <button onClick = {() => handleDownVote()}>down</button> */}
                    </div>
                    
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
    );
}
export default connect(mapStoreToProps)(ReviewItem);
