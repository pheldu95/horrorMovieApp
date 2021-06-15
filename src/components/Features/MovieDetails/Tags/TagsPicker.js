import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import axios from 'axios';
import { Button, Modal } from 'semantic-ui-react';
import Picker from '../Picker';
const TagsPicker = ({submit}) => {
    const [tags, setTags] = useState();
    const [open, setOpen] = useState(false)
    const [picks, setPicks] = useState([]);

    useEffect(() => {
        console.log('tagspicker useeffect');
        
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

    const handleSubmit = (picks) => {
        submit(picks);
        setOpen(false);
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
                <Button onClick={() => handleSubmit(picks)}>Submit</Button>
            </Button.Group>
        </Modal>
    );
}
export default connect(mapStoreToProps)(TagsPicker);
