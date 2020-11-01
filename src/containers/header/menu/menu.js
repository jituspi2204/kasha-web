import React from 'react';
import classes from './menu.css';
import Login from '../../../components/buttons/styleOne';
import sprite from '../../../assets/svg/sprite.svg';
import UserImg from '../../../components/img/userImg';
import {Link} from 'react-router-dom';
import AuthContext from '../../../hoc/auth-context';
import {withRouter} from 'react-router-dom';
import {hostname} from '../../../assets/constants/variables';
class Menu extends React.Component{

    state = {
        logout : false,
        isLoggedIn : false
    }


    render(){
        let block = (<AuthContext.Consumer> 
        {(context) => {
            return !context.isLoggedIn ? (
                <div className = {classes.self}>
                <Login> <svg>
                        <use xlinkHref = {`${sprite}#icon-key`}></use>
                    </svg>
                    <Link to = "/login">
                    Login
                </Link></Login>
                <Login> 
                <svg>
                        <use xlinkHref = {`${sprite}#icon-user`}></use>
                    </svg><Link to = "/register">
                    Register
                </Link></Login>
            </div>
            ): 
            (
                <div className = {classes.self}>
                <UserImg address = {hostname + "/users/" + context.photo} classN = {classes.displayTop} /> 
                <Login buttonClicked = {() => {return context.userType === 'customer' ? context.logoutHandler(this.props.history) : context.ownerLogoutHandler(this.props.history)}}>Logout</Login>  
            </div>
             
            )
        }}
        </AuthContext.Consumer>);
        return block;
    }

}


export default withRouter(Menu);