import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Header, Modal } from 'semantic-ui-react';

const SubgenrePicker = (movie) => {
    const history = useHistory();
    const [tags, setTags] = useState();
    const [open, setOpen] = useState(false)

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
    
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button size='mini'>Pick Tags</Button>}
        >
            {tags &&
                tags.map((tag) => {
                    return (
                        <Button>{tag.name}</Button>
                    )
                })
            }
        </Modal>
    );
}
export default connect(mapStoreToProps)(SubgenrePicker);
