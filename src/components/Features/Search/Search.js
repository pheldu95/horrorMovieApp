import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './Search.css';
import axios from 'axios';
import { Button, Input, Icon } from 'semantic-ui-react';

const Search = () => {
    const [query, setQuery] = useState();
    const dispatch = useDispatch();
    const submitQuery = () => {
        dispatch({
            type: 'SEARCH',
            payload: query
        })
    }
    return (
        
        <div>
            <h1>{query}</h1>
            <Input focus placeholder='Search...' onChange={(event) => setQuery(event.target.value)}/>
            <Button icon onClick = {() => submitQuery()}>
                <Icon name='search' />
            </Button>
        </div>
    );
}
export default connect(mapStoreToProps)(Search);
