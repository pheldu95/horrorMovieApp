import React, { useState, useEffect, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Header, Modal } from 'semantic-ui-react';
import TagsPicker from './TagsPicker';

const Tags = ({ movie }) => {
    const history = useHistory();
    const [currentMoviePickedTags, setCurrentMoviePickedTags] = useState();
    const [picks, setPicks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios({
            method: 'GET',
            url: `/api/tags/${movie.id}`
        }).then((response) => {
            setCurrentMoviePickedTags(response.data.rows);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }, []);

    //getting the pickedTags from TagsPicker. we send this function to tagspicker as a prop
    const submit = (pickedTags) => {
        let tagsAlreadyInDb = [];
        let newTags = []
        for (let i = 0; i < pickedTags.length; i++) {
            let tagExists = false;
            for (let existingTag of currentMoviePickedTags) {
                if (pickedTags[i] === existingTag.id) {
                    console.log(pickedTags[i], existingTag.id);
                    tagExists = true;
                }
            }
            if (tagExists) {
                tagsAlreadyInDb.push(pickedTags[i]);
            }else{
                newTags.push(pickedTags[i]);
            }
        }
        dispatch({
            type: 'UP_TAG_COUNTS',
            payload: { movieId: movie.id, tags: tagsAlreadyInDb }
        })
        dispatch({
            type: 'POST_NEW_TAGS',
            payload: { movieId: movie.id, tags: newTags }
        })
    }

    return (
        <Fragment>
            {currentMoviePickedTags&&
                currentMoviePickedTags.map((tag)=>{
                    return(
                        tag.name
                    )
                })
            }
            <TagsPicker movie={movie} submit={submit}/>
        </Fragment>
    );
}
export default connect(mapStoreToProps)(Tags);
