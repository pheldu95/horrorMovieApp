import React from 'react';
import { Dimmer } from 'semantic-ui-react'

const LoaderModal = () => {
    // const loader = useSelector((state) => state.loader)
    return (
        <Dimmer active >
            <div className="loader"></div>
        </Dimmer>
    );
}

export default (LoaderModal);