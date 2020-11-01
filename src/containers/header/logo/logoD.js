import React from 'react';
import Img from '../../../components/img/img'; 
import logoImg from '../../../assets/img/logo-d.png';
import classes from './logo.css';
import {Link} from 'react-router-dom';
const logod = props => {
    return(
       
        <div className = {classes.self}>
         <Link to="/">
            <Img address = {logoImg} />
         </Link>
        </div>
      
      
    );
}

export default logod;