import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Header, Modal } from 'semantic-ui-react';
import PickerButton from './PickerButton';

const Picker = ({ choices, handlePick, handleRemovePick }) => {

    return (
        <Fragment>
            {choices &&
                choices.map((choice) => {
                    return (
                        
                        <PickerButton choice={choice} handlePick={handlePick} handleRemovePick={handleRemovePick} />
                    )
                })
            }
        </Fragment>
    );
}
export default connect(mapStoreToProps)(Picker);
