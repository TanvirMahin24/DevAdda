import React, { Fragment } from 'react';
import spinner from './loading.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="spinner" style={{width: '200px', margin:'auto', display: 'block'}}/>
        </Fragment>
    )
}

export default Spinner
