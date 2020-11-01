import React from 'react';
import classes from './login.css';
import Left from '../../components/loginItems/loginLeft';
import Register from '../../components/loginItems/registerRight';
import Logins  from '../../components/loginItems/loginRight';
import ForgotPassword from '../../components/loginItems/forgotPassword';
import call from '../../call';
import Popups from '../../assets/messageBox/popup';
import AuthContext from '../../hoc/auth-context';
import Loader from '../../components/extra/loader';
import Spinner from '../../assets/messageBox/sideSpinner/sideSpinner';
class Login extends React.Component{

    state = {
        status : null,
        message : '',
        userType : 'customer',
        pops : null,
        loader : true,
        spinner : false
    }
    componentDidMount(){
        this.setState({
            ...this.state,
            loader:false
        })
    }
    loginHandler = (inputs) => {
        this.setState({
            ...this.state,
            spinner : true
        })
        if(inputs.userType === 'customer'){
            call.post('/login' ,inputs , {withCredentials : true})
            .then(res => {
                if(res.status === 200){
                    this.setState({
                        status : res.data.status,
                        message : res.data.message,
                        userType : inputs.userType,
                        spinner : false,
                        pops : <Popups data = {{status : res.data.status , message : res.data.message}} key = {Date.now()}/>
                    });
                }
            }).catch(err => {
                let mm = {...err.response.data};
                this.setState({
                    ...this.state,
                    status:mm.status,
                    message:mm.message,
                    spinner : false,
                    userType : inputs.userType,
                    pops : <Popups data = {{...mm}} key = {Date.now()}/>
                });
                
            })
        }else if(inputs.userType === 'owner'){
            call.post('/owner/login' ,inputs , {withCredentials : true})
            .then(res => {
                if(res.status === 200){
                    this.setState({
                        status : res.data.status,
                        message : res.data.message,
                        userType : inputs.userType,
                        spinner : false,
                        pops : <Popups data = {{status : res.data.status , message : res.data.message}} key = {Date.now()}/>
                    });
                }
            }).catch(err => {
                console.log(err);
                let mm = {...err.response};
                this.setState({
                    ...this.state,
                    status :  mm.status,
                    message : mm.message,
                    userType : inputs.userType,
                    spinner : false,
                    pops : <Popups data = {{...mm}} key = {Date.now()}/>
                });
                
            })
        }

       
        
    }

    registerHandler = (inputs) => {
        this.setState({
            ...this.state,
            spinner : true
        })
        if(inputs.userType === 'customer'){
            call.post('/signup' ,inputs)
            .then(res => {
            if(res.data.status === 'success'){
                    this.setState({
                        status : res.data.status,
                        message : res.data.message,
                        spinner : false,
                        pops : <Popups data = {{status : res.data.status , message : res.data.message}} key = {Date.now()}/>
                    });
                }
                
            }).catch(err => {
                let mm = {...err.response.data};
                this.setState({
                    status : mm,
                    message : err.response.data.message,
                    spinner : false,
                    pops : <Popups data = {{...mm}} key = {Date.now()}/>
                });
            })
        }else if(inputs.userType === 'owner'){
            call.post('/owner/signup' ,inputs)
            .then(res => {
             if(res.data.status === 'success'){
                    this.setState({
                        ...this.state,
                        status : res.data.status,
                        message : res.data.message,
                        spinner : false,
                        pops : <Popups data = {{status : res.data.status , message : res.data.message}} key = {Date.now()}/>
                    });
                }
                
            }).catch(err => {
                let mm = {...err.response.data};
                this.setState({
                    status : mm,
                    message : err.response.data.message,
                    spinner : false,
                    pops : <Popups data = {{...mm}} key = {Date.now()}/>
                });
            })
        }
    }

    forgotPasswordHandler = (inputs) => {
        this.setState({
            ...this.state,
            spinner : true
        })
        if(inputs.userType === 'customer'){
            call({
                method : 'post',
                url : '/forgot-password',
                data : {
                    email : inputs.email
                }
            }).then(res => {
                this.setState({
                    ...this.state,
                    status : res.data.status,
                    message : res.data.message,
                    spinner : false,
                    userType : 'customer',
                    pops : <Popups data = {{status : res.data.status , message : res.data.message}} key = {Date.now()}/>
                })
            }).catch(err => {
                let mm = {...err.response.data};
                this.setState({
                    ...this.state,
                    status : mm,
                    message : err.response.data.message,
                    spinner : false,
                    pops : <Popups data = {{...mm}} key = {Date.now()}/>
                });
            })
        }else if(inputs.userType === 'owner'){
            call({
                method : 'post',
                url : '/owner/forgot-password',
                data : {
                    email : inputs.email
                }
            }).then(res => {
                this.setState({
                    ...this.state,
                    status : res.data.status,
                    message : res.data.message,
                    spinner : false,
                    userType : 'owner',
                    pops : <Popups data = {{status : res.data.status , message : res.data.message}} key = {Date.now()}/>
                })
            }).catch(err => {
                let mm = {...err.response.data};
                this.setState({
                    ...this.state,
                    status : mm,
                    message : err.response.data.message,
                    spinner : false,
                    pops : <Popups data = {{...mm}} key = {Date.now()}/>
                });
            })
        }
    }
    render(){
        let pop = null;
        if(this.state.status){
            pop = <AuthContext.Consumer>
                {
                    (context) =>{
                       
                        if(this.state.status === "success"){
                            setTimeout(() => {
                                if(this.props.location.pathname === '/login'){
                                    if(this.state.userType === 'customer'){
                                        this.props.history.push('/');
                                        context.loginStateHandler();
                                    }else if(this.state.userType === 'owner'){
                                        this.props.history.push('/hotel');
                                        context.ownerLoginHandler();
                                    }
                                }else if(this.props.location.pathname === '/register'){
                            
                                    this.props.history.push('/');
                                    
                                }else if(this.props.location.pathname === '/forgot-password'){
                                    this.props.history.push('/');
                                }
                               
                                
                            },1000);
                            
                        }
                        return null;
                    }
                }
            </AuthContext.Consumer>
            
        }
        const block = this.props.location.pathname === '/register' ?  (<Register submitClicked = {(inputs) => {this.registerHandler(inputs)}} />) 
        : this.props.location.pathname  === '/login' ?
        (<Logins submitClicked = {(inputs) => {this.loginHandler(inputs)}} />) :
        (<ForgotPassword submitClicked = {(inputs) => {this.forgotPasswordHandler(inputs)}} />)
        return this.state.loader ? (<Loader /> ):
        (
            <div className = {classes.self} > 
                {this.state.pops}
                {pop}
                <Left />
                <div className = {classes.form}>
                    {block}
                </div>
                {this.state.spinner ? <Spinner /> : null}
            </div>
        )
    }

}

export default Login;