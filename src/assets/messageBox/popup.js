import React from 'react';
import classes from './messageBox.css';
import check from '../img/check.png';
import uncheck from  '../img/denied.png';
class popups extends React.Component {
    state = {
        status : '',
        message : ''
    }

   
    render(){
    const colorClass = this.props.data.status === 'denied' ? classes.red : classes.green;
    const image = this.props.data.status === 'denied' ? uncheck : check;
    return(
        <div className = {`${classes.self} ${colorClass}`}>
            <img src = {image} alt = "Popup"/>
            <h2>{this.props.data.message}</h2>
        </div>
    );
    }
}

export default popups;