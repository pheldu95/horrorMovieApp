import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Header, Modal } from 'semantic-ui-react';
import Picker from '../Picker';

const SubgenrePicker = ({submit}) => {
    const history = useHistory();
    const [subgenres, setSubgenres] = useState();
    const [open, setOpen] = useState(false);
    const [picks, setPicks] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/api/subgenres'
        }).then((response) => {
            setSubgenres(response.data.rows);
        }).catch((error) => {
            console.log(error);
            alert(error);
        })
    }, []);

    //add a pick to the array of picks that we will send to the db
    const handlePick = (id) =>{
        setPicks([...picks, id])
    }
    //remove from array of picks
    const handleRemovePick = (id) =>{
        for (let i = 0; i < picks.length; i++) {
           if(picks[i] === id){
               picks.splice(i, 1);    
           } 
        }
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button size='mini'>Pick Subgenres</Button>}
        >
            <Picker choices={subgenres} handlePick={handlePick} handleRemovePick={handleRemovePick}/>
            <br />
            <br />
            <Button.Group>
                <Button>Cancel</Button>
                <Button onClick={() => submit(picks)}>Submit</Button>
            </Button.Group>
        </Modal>
    );
}
export default connect(mapStoreToProps)(SubgenrePicker);
