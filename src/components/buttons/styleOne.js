import React from 'react';
import classes from './button.css';

const styleOne = props => {
    return(
        <button className = {`${classes.button} ${classes.styleOne}`} onClick = {props.buttonClicked}>
            {props.children}
        </button>
    );
};

export default styleOne;