import React from 'react';
import Img from '../../../components/img/img'; 
import logoImg from '../../../assets/img/logo.png';
import classes from './logo.css';
import {Link} from 'react-router-dom';
const logo = props => {
    return(
       
        <div className = {classes.self}>
         <Link to="/">
            <Img address = {logoImg} />
         </Link>
        </div>
      
      
    );
}

export default logo;