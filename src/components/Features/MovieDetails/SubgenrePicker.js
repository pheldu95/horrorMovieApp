import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Header, Modal } from 'semantic-ui-react';
import PickerButton from './PickerButton';

const SubgenrePicker = (movie) => {
    const history = useHistory();
    const [review, setReview] = useState();
    const [subgenres, setSubgenres] = useState();
    const [open, setOpen] = useState(false)
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

    const submit = () => {
        console.log(picks);

    }

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
            trigger={<Button size='mini'>Pick Subgenre</Button>}
        >
           {subgenres&&
                subgenres.map((subgenre)=>{
                   return(
                    //    <PickerButton pick={subgenre} onClick={() => setPicks([...picks, subgenre.id])}/>
                       <PickerButton pick={subgenre} handlePick={handlePick} handleRemovePick={handleRemovePick}/>
                    )
               })
           }
            <br />
            <br />
            <Button.Group>
                <Button>Cancel</Button>
                <Button onClick={() => submit()}>Submit</Button>
            </Button.Group>
        </Modal>
    );
}
export default connect(mapStoreToProps)(SubgenrePicker);
