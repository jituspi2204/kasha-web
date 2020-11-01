import React from 'react';
import Aux from '../../hoc/Auxillary';
import Header from '../../containers/header/header';
import classes from './layout.css';

class Body extends React.Component{

    render(){
        return(
            <Aux classList = {classes.self}>
                <Header />
            </Aux>
        );
    }
}


export default Body;