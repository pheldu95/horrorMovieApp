import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { Feed, Statistic } from 'semantic-ui-react';
import axios from 'axios';
import imageSrc from '../../../../assets/default-user-image.png'

const MovieReviewsDisplay = ({ review }) => {
    
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
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
    );
}
export default connect(mapStoreToProps)(MovieReviewsDisplay);
