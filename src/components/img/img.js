import React from 'react';
import classes from './img.css';

const img = props => {
    return(
        <img src = {props.address} className={classes.self}/> 
    );
}

export default img;