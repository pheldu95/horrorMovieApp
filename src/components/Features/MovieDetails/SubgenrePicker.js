import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Header, Modal } from 'semantic-ui-react';

const SubgenrePicker = (movie) => {
    const history = useHistory();
    const [review, setReview] = useState();
    const [subgenres, setSubgenres] = useState();
    const [open, setOpen] = useState(false)

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
        console.log(review);

    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button size='mini'>Pick Movie Tags</Button>}
        >
           {subgenres&&
                subgenres.map((subgenre)=>{
                   return(
                       <Button>{subgenre.name}</Button>
                    )
               })
           }
        </Modal>
    );
}
export default connect(mapStoreToProps)(SubgenrePicker);
