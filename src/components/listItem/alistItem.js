import React from 'react';
import classes from './listItem.css';
import sprite from '../../assets/svg/sprite.svg';
import {NavLink} from 'react-router-dom';
const alistItem = props => {

    const icons = props.icon ? (
        <svg className = {classes.icon}>
            <use xlinkHref = {`${sprite}#icon-chevron-thin-down`}></use>
        </svg>
    ) : null;

    const list = (<li className = {classes.self}>
       <NavLink to = {`/${props.children}`}>
            {props.children}
            {icons}
        </NavLink>
     </li>);
    return(
        list
    );
}

export default alistItem;