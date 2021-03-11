import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const PickerButton = ({pick}) => {
    const [selected, setSelected] = useState();
    
    return (
        <Fragment>
            {selected?
                <Button active onClick={(() => setSelected(false))}>{pick.name}</Button>
                : <Button onClick={(() => setSelected(true))}>{pick.name}</Button>
            }
        </Fragment>
    );
}
export default connect(mapStoreToProps)(PickerButton);
