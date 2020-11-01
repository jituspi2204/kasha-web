import React from 'react';
import Classes from './sideSpinner.css';

const SideSpinner = props => {
    return(
        <div className = {Classes.self}>
            <div className={Classes.loader}>Loading...</div>
        </div>
    )
}

export default SideSpinner;