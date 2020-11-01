import React from 'react';
import classes from './loginItems.css';
import Input from '../input/input';
import sprite from '../../assets/svg/sprite.svg';
import Register from '../../components/buttons/styleOne';
import Login from '../../components/buttons/styleTwo';
import {Link} from 'react-router-dom';
import Toggler from '../input/toggler';


class RegisterRight extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            password : '',
            email: '',
            confirmPassword : '',
            userType : 'customer'
        }
        this.registerRef = React.createRef();
    }

    componentDidMount(){
        this.registerRef.current.onkeypress = (event) =>{
            if(event.keyCode === 13 || event.which === 13){
                this.onRegisterHandler();
            }
        }
    }

    inputChanged = (event , id)=>{
        
        if(id === 'name'){
            this.setState({
                ...this.state,
                name : event.target.value
            })
        }else if(id === 'email'){
            this.setState({
                ...this.state,
                email : event.target.value
            })
        }else if(id === 'password'){
            this.setState({
                ...this.state,
                password : event.target.value
            })
        }else if(id === 'confirmPassword'){
            this.setState({
                ...this.state,
                confirmPassword : event.target.value
            })
        }else if(id === 'userType'){
            this.setState({
                ...this.state,
                userType : event ? 'owner' : 'customer'
            })
        } 
        
    }
    onRegisterHandler  = () =>{
       if(this.state.password === this.state.confirmPassword){
            this.setState({
                ...this.state,
                isRegister : true
            });
            const userData = {...this.state}
            this.props.submitClicked(userData);
       }else{
           alert("Password Doesn't Match")
       }

    }

    render(){

        return(
            <div className = {classes.selfB} ref = {this.registerRef}>
        <h1>
            Register
        </h1>
            <div className = {classes.field}>
                <Input types = "text" names = "name" 
                ph ="Name" changed = {(event) => this.inputChanged(event , "name")}/>
                <svg className = {classes.icon}>
                    <use xlinkHref = {`${sprite}#icon-user`}></use>
                </svg>
            </div>
            <div className = {classes.field}>
                <Input types = "email" names = "email" 
                ph ="Email" changed = {(event) => this.inputChanged(event , "email")}/>
                <svg className = {classes.icon}>
                    <use xlinkHref = {`${sprite}#icon-link`}></use>
                </svg>
            </div>
            <div className = {classes.field}>
                <Input types = "password" 
                names = "password" 
                ph="Password" 
                autoComplete = "off" 
                changed = {(event) => this.inputChanged(event , "password")}/>
                <svg className = {classes.icon}>
                    <use xlinkHref = {`${sprite}#icon-key`} ></use>
                </svg>
            </div>
            <div className = {classes.field}>
                <Input types = "password" 
                names = "confirmPassword"
                ph="Confirm Password" 
                autoComplete = "off" 
                changed = {(event) => this.inputChanged(event , "confirmPassword")}/>
                <svg className = {classes.icon}>
                    <use xlinkHref = {`${sprite}#icon-key`}></use>
                </svg>
            </div>
            <div className = {classes.userType}>
                <h2>Customer</h2>
                <div>
                <Toggler getValue = {(value) => this.inputChanged(value , "userType")}/>
                </div>
                <h2>Owner</h2>
            </div>
            <Register buttonClicked = {this.onRegisterHandler}>Register</Register>
            <Link to = '/login'>
                <Login>Login</Login>
            </Link>
        </div>

        );

    }


}

export default RegisterRight;