import React from 'react';
import classes from './loginItems.css';
import Input from '../input/input';
import sprite from '../../assets/svg/sprite.svg';
import Register from '../../components/buttons/styleOne';
import Login from '../../components/buttons/styleTwo';
import {Link} from 'react-router-dom';
import Toggler from '../input/toggler';
class ForgorPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            userType : 'customer',
        }
        this.forgotRef = React.createRef();
    }

    componentDidMount(){
        this.forgotRef.current.onkeypress = (event) => {
            if(event.keyCode === 13 || event.which === 13){
                this.onForgorPasswordHandler();
            }
        }

    }

    inputChanged = (event , id)=>{
        if(id === 'email'){
            this.setState({
                ...this.state,
                email : event.target.value
            })
        }else if(id === 'userType'){
            this.setState({
                ...this.state,
                userType : event ? 'owner' : 'customer'
            })
        }
    }

    onForgorPasswordHandler = () =>{
        const userData = {...this.state};
        this.props.submitClicked(userData);
    }

    render(){
        
        return (
        <div className = {classes.selfB} ref = {this.forgotRef}>
        <h1>
            Forgor Password
        </h1>
            <div className = {classes.field}>
                <Input types = "email" names = "email" ph ="Email"
                    changed = {(event) => this.inputChanged(event , "email")}
                />
                <svg className = {classes.icon}>
                    <use xlinkHref = {`${sprite}#icon-link`}></use>
                </svg>
            </div>
            <div className = {classes.userType}>
                <h2>Customer</h2>
                <div>
                <Toggler getValue = {(value) => this.inputChanged(value , "userType")}/>
                </div>
                <h2>Owner</h2>
            </div>
            <Login buttonClicked = {this.onForgorPasswordHandler}>Submit</Login>
            <Link to = "/login">
                <Register>Login</Register>
            </Link>
        </div>
        );
    
    }
}

export default ForgorPassword;

