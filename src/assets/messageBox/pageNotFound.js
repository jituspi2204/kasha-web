import React from 'react';
import classes from './messageBox.css';
import Left from '../../components/loginItems/loginLeft';
import Button from '../../components/buttons/styleOne';
import {withRouter} from 'react-router-dom';
const PageNotFound = props => {

    return(
        <div className = {classes.pageNotFound}>
            <Left />
            <div className = {classes.right}>
                <h1>404</h1>
                <h3>Page Not Found</h3>
                <Button buttonClicked = {() => {props.history.push('/')}}>Go to homepage</Button>
            </div>
        </div>
    )

}
export default withRouter(PageNotFound);