import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const PickerButton = ({pick, handlePick, handleRemovePick}) => {
    const [selected, setSelected] = useState(false);
    const handleClick = (id) =>{
        setSelected(!selected);
        if(selected){
            handleRemovePick(id);
        }else{
            handlePick(id);
        }
    }
    return (
        <Fragment>
            {selected?
                <Button active onClick={(() => handleClick(pick.id))}>{pick.name}</Button>
                : <Button onClick={(() => handleClick(pick.id))}>{pick.name}</Button>
            }
        </Fragment>
    );
}
export default connect(mapStoreToProps)(PickerButton);
