import React from 'react';

const aux = props => {
    return(
        <div className = {props.classList}>
            {props.children}
        </div>
    );  
}

export default aux;