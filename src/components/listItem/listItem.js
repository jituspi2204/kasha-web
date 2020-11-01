import React from 'react';
import classes from './listItem.css';
import sprite from '../../assets/svg/sprite.svg';

const listItem = props => {
    const list = (<li className = {`${classes.self} ${props.classN}`} onClick = {props.itemClicked}>
        {props.children}
     </li>);
    return(
        list
    );
}

export default listItem;