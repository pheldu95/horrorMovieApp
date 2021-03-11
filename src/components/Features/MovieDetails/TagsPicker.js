import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Header, Modal } from 'semantic-ui-react';
import Picker from './Picker';
const TagsPicker = ({movie}) => {
    const history = useHistory();
    const [tags, setTags] = useState();
    const [open, setOpen] = useState(false)
    const [picks, setPicks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/api/tags'
        }).then((response) => {
            setTags(response.data.rows);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }, []);

    const submit = () => {
        //send a dispatch with the users votes for movie tags
        //if those tags are already in the db for that specific movie, then it will do a put from the redux store and just up the vote count for that tag
        dispatch({
            type: 'POST_TAGS',
            payload: { tagIds: picks, movieId: movie.id } 
        });
    }

    //add a pick to the array of picks that we will send to the db
    const handlePick = (id) => {
        setPicks([...picks, id])
    }
    //remove from array of picks
    const handleRemovePick = (id) => {
        for (let i = 0; i < picks.length; i++) {
            if (picks[i] === id) {
                picks.splice(i, 1);
            }
        }
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button size='mini'>Pick Tags</Button>}
        >
            <Picker choices={tags} handlePick={handlePick} handleRemovePick={handleRemovePick} />
            <br />
            <br />
            <Button.Group>
                <Button>Cancel</Button>
                <Button onClick={() => submit()}>Submit</Button>
            </Button.Group>
        </Modal>
    );
}
export default connect(mapStoreToProps)(TagsPicker);
