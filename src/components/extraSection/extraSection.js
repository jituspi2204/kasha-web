import React from 'react';
import classes from './extraSeciton.css';

const extraSeciton = props => {
    const comp = props.display ? (<div className = {classes.self}>
            {props.children}
        </div>) : null;
    return(
        comp
    );
}

export default extraSeciton;