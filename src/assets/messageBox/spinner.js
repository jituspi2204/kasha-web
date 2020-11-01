import React from 'react';
import classes from './messageBox.css';
import sprite from '../svg/sprite.svg';
class Spinner extends React.Component {
    state = {
        status : '',
        message : ''
    }
    render(){
    return(
        <div className = {`${classes.self}`}>
            <svg>
                <use xlinkHref = {`${sprite}#icon-cycle`}> </use>
            </svg>
        </div>
    );
    }
}

export default Spinner;