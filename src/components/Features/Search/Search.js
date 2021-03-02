import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './Search.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Input, Icon } from 'semantic-ui-react';

const Search = () => {
    const history = useHistory();
    const [query, setQuery] = useState();
    
    const submitQuery = () => {
        let uriEncoded = encodeURI(query);
        history.push(`/search/${uriEncoded}`);
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
