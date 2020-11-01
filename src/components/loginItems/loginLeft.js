import React from 'react';
import classes from './loginItems.css';
import logo from '../../assets/img/logo.png';
import {Link} from 'react-router-dom';
const loginLeft = props => {
    return(
        <div className = {classes.self}>
            <Link to ="/">
                <img src = {logo} alt = "kasha" />
            </Link>
            
            <h2>
                Book Hotel and Resort 
            </h2>
            <h3>
                Indian largest Hotel branch
            </h3>
            <h1>Over 1000+ cites </h1>
        </div>
    );
}

export default loginLeft;