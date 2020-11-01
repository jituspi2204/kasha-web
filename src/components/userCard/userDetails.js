import React from 'react';
import classes from './userCard.css';
import Button from '../buttons/styleOne';
import Input from '../input/input';
import sprite from '../../assets/svg/sprite.svg';
import {hostname} from '../../assets/constants/variables';
class UserDetails extends React.Component {
    state = {
        photo : null
    }
    componentDidMount(){
       
    }
    photoChanged = (event) => {
        this.setState({
            photo: event.target.files[0]
        })
        this.props.photoUploaded(event);
    }
    render(){
    return (
        <div>
                <div className = {classes.subMenu}>
                    <h1>My Details</h1>
                    <div className = {classes.userImage}>
                    <img src = {this.state.photo ? URL.createObjectURL(this.state.photo) : hostname +  "/users/" + this.props.values.userPhoto}/>
                    {this.props.userType === 'customer' ? (<input type = "file" onChange = {this.photoChanged}/>) : null}
                    
                    <svg>
                        <use xlinkHref = {`${sprite}#icon-images`}></use>
                    </svg>
                    </div>
                    <div className = {classes.userDetails}>
                        <h2>Name</h2>
                        <Input types = "text" ph ={this.props.values.name} changed = {(event)=>this.props.changed(event , "name")}/>
                        <h2>Email</h2>
                        <Input types = "email" ph ={this.props.values.email} changed = {(event)=>this.props.changed(event , "email")}/>
                        <Button buttonClicked = {(event) => {this.props.buttonClicked(event, "details")}}>Save Details</Button>
                    </div>
                </div>
                <div className = {classes.subMenu}>
                    <h1>Password Details</h1>
                    <div className = {classes.userDetails}>
                        <h2>Old Password</h2>
                        <Input types = "password" changed = {(event)=>this.props.changed(event , "oldPassword")}/>
                        <h2>New Password</h2>
                        <Input types = "password" changed = {(event)=>this.props.changed(event , "newPassword")}/>
                        <h2>Confirm Password</h2>
                        <Input types = "password" changed = {(event)=>this.props.changed(event , "confirmPassword")}/>
                        <Button buttonClicked = {(event) => {this.props.buttonClicked(event, "password")}}>Update Password</Button>
                </div>
            </div>
        </div>
    );
    }
}

export default UserDetails;