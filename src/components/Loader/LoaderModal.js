import React, { useEffect } from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const LoaderModal = () => {
    // const loader = useSelector((state) => state.loader)
    return (
        <Dimmer active >
            <Loader>Loading</Loader>
        </Dimmer>
    );
}

export default (LoaderModal);