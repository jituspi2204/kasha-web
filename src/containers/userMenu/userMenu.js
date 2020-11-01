import React from 'react';
import classes from './userMenu.css';
import ListItem from '../../components/buttons/styleOne';
import {Link} from 'react-router-dom';
// import Search from '../../components/search/search';
class UserMenu extends React.Component{
    render(){
        return(
            <div className = {classes.self}>
                <ul>

                    <ListItem>Offers</ListItem>
                    <Link to ="/me">
                        <ListItem>User Details</ListItem>
                    </Link>
                    <Link to = "/me">
                        <ListItem>Update Password</ListItem>
                    </Link>
                    <Link to ="/me">
                        <ListItem>Booking History</ListItem>
                    </Link>
                   <Link to = "/me">
                        <ListItem>My Reviews</ListItem>
                   </Link>
                   
                </ul>
            </div>
        );
    }
}

export default UserMenu;