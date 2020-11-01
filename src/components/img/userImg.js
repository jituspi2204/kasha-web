import React from 'react';
import classes from './img.css';
import {Link} from 'react-router-dom';
const userImg = props => {
    return(
        <div className = {`${classes.userImg} ${props.classN}`}>
        <Link to = "/me">
            <img src = {props.address} />
        </Link>
            
        </div>
    );
}


export default userImg;