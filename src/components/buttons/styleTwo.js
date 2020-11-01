import React from 'react';
import classes from './button.css';


const styleTwo = props => {
    return(
        <button className = {`${classes.button} ${classes.styleTwo}`} onClick = {props.buttonClicked} 
        onDoubleClick = {props.doubleClicked}>
            {props.children}
        </button>
    );
};

export default styleTwo;