import React from 'react';
import classes from './nav.css';
import Ali from '../../../components/listItem/listItem';
import {withRouter , NavLink} from 'react-router-dom';
import sprite from '../../../assets/menu/sprite.svg';
class Nav extends React.Component{
    cons
    render(){
        return(
            <nav className = {classes.self}>
                <ul className = {classes.ul}>
                    <Ali><NavLink to = "/" activeClassName = {classes.active}>
                    <svg className = {classes.icons}>
                        <use xlinkHref = {`${sprite}#icon-home`}></use>
                    </svg>
                    Home</NavLink></Ali>
                    <Ali><NavLink activeClassName = {classes.active} to = {`/search?minPrice=${0}&maxPrice=${20000}&minRating=${0}&maxRating=${5}&minRange=${0}&maxRange=${100}&sortPrice=${1}&sortRating=${-1}&lat=${null}&lng=${null}&city=&rooms=${1}&propertyType=Hotel`}>
                    <svg className = {classes.icons}>
                        <use xlinkHref = {`${sprite}#icon-bed`}></use>
                    </svg>
                    Hotels</NavLink></Ali>
                    <Ali><NavLink activeClassName = {classes.active} to = {`/search?minPrice=${0}&maxPrice=${20000}&minRating=${0}&maxRating=${5}&minRange=${0}&maxRange=${100}&sortPrice=${1}&sortRating=${-1}&lat=${null}&lng=${null}&city=&rooms=${1}&propertyType=Resort`}>
                    <svg className = {classes.icons}>
                        <use xlinkHref = {`${sprite}#icon-window-restore`}></use>
                    </svg>
                    Resorts</NavLink></Ali>
                    <Ali><NavLink activeClassName = {classes.active} to = "/api">
                    <svg className = {classes.icons}>
                        <use xlinkHref = {`${sprite}#icon-tab`}></use>
                    </svg>
                    API</NavLink></Ali>
                    <Ali><a href="#footer">
                    <svg className = {classes.icons}>
                        <use xlinkHref = {`${sprite}#icon-info`}></use>
                    </svg>
                    About Us</a></Ali>
                </ul>
            </nav>

        );
    }

}
export default withRouter(Nav);