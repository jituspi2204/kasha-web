import React from 'react';
import classes from './extra.css';

const loader = props => {
    return (
        <div className = {`${classes.loader} ${props.classN}`} >
            <div className = {classes.container}>
              
            </div>
        </div>
    );

}

export default loader;