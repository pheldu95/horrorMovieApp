import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './Search.css';
import { useHistory, Link } from 'react-router-dom';
import { Button, Input, Icon, Form } from 'semantic-ui-react';

const Search = () => {
    const history = useHistory();
    const [query, setQuery] = useState();
    
    const submitQuery = () => {
        let uriEncoded = encodeURI(query);
        console.log(history);
        history.push({
           pathname: `/search/${uriEncoded}/1`
        });
    }
    return (
        
        <div>
            <h1>{query}</h1>
            <Form onSubmit={() => submitQuery()}>
                <Form.Group>
                    <Form.Input 
                        inverted 
                        icon={{ name: 'search', circular: true, link: true, onClick: () => submitQuery() }} 
                        focus 
                        placeholder='Search...' 
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    {/* <Form.Button icon onClick = {() => submitQuery()}>
                        <Icon name='search' />
                    </Form.Button> */}
                </Form.Group>
            </Form>
        </div>
    );
}
export default connect(mapStoreToProps)(Search);
