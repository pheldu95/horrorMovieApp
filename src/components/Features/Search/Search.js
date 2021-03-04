import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './Search.css';
import { useHistory } from 'react-router-dom';
import { Form } from 'semantic-ui-react';

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
            <Form onSubmit={() => submitQuery()}>
                <Form.Group>
                    <Form.Input 
                        inverted 
                        icon={{ name: 'search', circular: true, link: true, onClick: () => submitQuery() }} 
                        focus 
                        placeholder='Search...' 
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </Form.Group>
            </Form>
        </div>
    );
}
export default connect(mapStoreToProps)(Search);
