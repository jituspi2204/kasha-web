import React from 'react';
import classes from './loginItems.css';
import Input from '../input/input';
import sprite from '../../assets/svg/sprite.svg';
import Register from '../../components/buttons/styleOne';
import Login from '../../components/buttons/styleTwo';
import {Link} from 'react-router-dom';
import Toggler from '../input/toggler';
class LoginRight extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            userType : 'customer',
        }
        this.loginRef = React.createRef();
    }
    
    componentDidMount(){
        // console.log(this.loginRef);
       this.loginRef.current.onkeypress = (event) => {
        if(event.keyCode === 13 || event.which === 13){
            this.onLoginHandler();
        }
       }

    }

    inputChanged = (event , id)=>{
        if(id === 'email'){
            this.setState({
                ...this.state,
                email : event.target.value
            })
        }else if(id === 'password'){
            this.setState({
                ...this.state,
                password : event.target.value
            })
        }else if(id === 'userType'){
            this.setState({
                ...this.state,
                userType : event ? 'owner' : 'customer'
            })
        }
    }

    onLoginHandler = () =>{
        const userData = {...this.state};
        this.props.submitClicked(userData);
    }

    render(){
        
        return (
            
        <div className = {classes.selfB} ref ={this.loginRef} >
        <h1>
            Login
        </h1>
            <div className = {classes.field}>
                <Input types = "email" names = "email" ph ="Email"
                    changed = {(event) => this.inputChanged(event , "email")}
                />
                <svg className = {classes.icon}>
                    <use xlinkHref = {`${sprite}#icon-link`}></use>
                </svg>
            </div>
            <div className = {classes.field}>
                <Input types = "password" names = "password" ph="Password"
                    changed = {(event) => this.inputChanged(event , "password")}
                    autoComplete = "off" 
                />
                <svg className = {classes.icon}>
                    <use xlinkHref = {`${sprite}#icon-key`} ></use>
                </svg>
            </div>
            <div className = {classes.userType}>
                <h2>Customer</h2>
                <div>
                <Toggler getValue = {(value) => this.inputChanged(value , "userType")}/>
                </div>
                <h2>Owner</h2>
            </div>
            <Login buttonClicked = {this.onLoginHandler}>Login</Login>
           
            {/* <div className = {`${classes.field} ${classes.google}`}>
                <Input types = "submit" names = "gmail" />
                <svg className = {classes.icon}>
                    <use xlinkHref = {`${sprite}#icon-google`}></use>
                </svg>
            </div> */}
           <Link to = "/forgot-password">
            Forgot Password
           </Link>
            <Link to = "/register">
                <Register>Register</Register>
            </Link>
        </div>
        );
    
    }
}

export default LoginRight;

