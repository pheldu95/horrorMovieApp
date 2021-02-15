import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import './Search.css';
import { useHistory } from "react-router-dom";
import { Button, Input, Icon } from 'semantic-ui-react';

const Search = () => {
    
    return (
        <div >
            <Input focus placeholder='Search...' />
            <Button icon>
                <Icon name='search' />
            </Button>
        </div>
    );
}
export default connect(mapStoreToProps)(Search);
