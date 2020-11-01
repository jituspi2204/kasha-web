import React from 'react';
import classes from './nav.css';
import Ali from '../../../components/listItem/listItem';
import {withRouter , NavLink} from 'react-router-dom';

class OwnerNav extends React.Component{

    render(){
        return(
            <nav className = {classes.self}>
                <ul className = {classes.ul}>
                    <Ali><NavLink to = "/hotel">My Hotel</NavLink></Ali>
                </ul>
            </nav>

        );
    }

}
export default withRouter(OwnerNav);