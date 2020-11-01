import React from 'react';
import UserLayout from '../../components/layout/userLayout';
import Login from '../login/login';
import classes from './body.css';
import {Route ,Switch} from 'react-router-dom';
import call from '../../call';
import SearchLayout from '../../components/layout/searchLayout';
import FullPageLayout from '../../components/layout/fullPageLayout';
import HotelLayout from '../../components/layout/hotelLayout/hotelLayout';
import LoginsLayout from '../../components/layout/loginsLayout';
import AuthContext from '../../hoc/auth-context';
import Payment from '../payments/payment';
import RegisterHotel from '../registerHotel/registerHotel';
import PageNotFound from '../../assets/messageBox/pageNotFound';
import VerifiedEmail from '../../assets/messageBox/emailVerified';
import Loader from '../../components/extra/loader';
class Body extends React.Component{
    
    state = {
        isLoggedIn: false,
        cities : [],
        photo : 'user-0.png',
        userType : 'customer',
        loader : false
      };
    
      componentDidMount() {
        window.cities = [];
        const city = this.props.city;
        call('/api/v1/cities')
        .then(res => {  
            window.cities = [...res.data.result];
            this.setState({
                ...this.state,
                cities : res.data.result
            })
        }).catch(err => {
        });

        if(!this.loginStateHandler()){
          this.ownerLoginHandler();
        }
      }

      loginStateHandler = () => {
        if(!this.state.isLoggedIn){
        call
          .get("/", { withCredentials: true })
          .then((res) => {
            if (res.data.status === "loggedIn") {
              this.setState({
                ...this.state,
                isLoggedIn: true,
                photo : res.data.userPhoto,
                userType: this.state.userType
              });
              return true;
            }
            if (res.data.status === "notLoggedIn") {
              this.setState({
                ...this.state,
                isLoggedIn: false,
              });
              return false;
            }
          })
          .catch((err) => {
            return false;
          });
        }
      }

      initiateLogout = (history) => {
        this.setState({
          ...this.state,
          loader :true
        })
        call
          .get("/logout", { withCredentials: true })
          .then((res) => {
            if (res.status == 200) {
              this.setState({
                ...this.state,
                isLoggedIn: false,
                photo : res.data.userPhoto,
                userType: "customer",
                loader :false
              });
              setTimeout(
                ()=>{
                  history.push('/');
                }
              ,100);
              
            }
          })
          .catch((err) => {
            this.setState({
              ...this.state,
              loader :false
            })
          });
      };
    
      ownerLoginHandler = () => {

        if(!this.state.isLoggedIn){
          call
            .get("/owner", { withCredentials: true })
            .then((res) => {
              console.log(res.data.status);
              if (res.data.status == "loggedIn") {
                this.setState({
                  ...this.state,
                  isLoggedIn: true,
                  photo : res.data.userPhoto,
                  userType: res.data.userType
                });
              }
            else{
                this.setState({
                  ...this.state,
                  isLoggedIn: false,
                });
              }
            })
            .catch((err) => {});
          }
      }

      ownerLogoutHandler = (history) => {
        this.setState({
          ...this.state,
          loader :true
        })
        call
        .get("/owner/logout", { withCredentials: true })
        .then((res) => {
          if (res.status == 200) {
            this.setState({
              ...this.state,
              isLoggedIn: false,
              photo : res.data.userPhoto,
              userType: "customer",
              loader :false
            });
            setTimeout(
              ()=>{
                history.push('/');
              }
            ,100);
            
          }
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            loader : false
          })
        });
      }

    render(){
        return this.state.loader ? <Loader /> : ( 
            <div className = {classes.self}>
            {/* <UserLayout /> */}
            <AuthContext.Provider
            value={{
                isLoggedIn: this.state.isLoggedIn,
                logoutHandler: this.initiateLogout,
                loginStateHandler : this.loginStateHandler,
                ownerLoginHandler : this.ownerLoginHandler,
                ownerLogoutHandler : this.ownerLogoutHandler,
                photo : this.state.photo,
                userType : this.state.userType
            }}
            >    <Switch>
                <Route path = "/" exact component = {UserLayout}/>
                <Route path = "/me" exact component = {LoginsLayout} />
                <Route path = "/hotel" exact component = {HotelLayout} />
                <Route path = "/login" exact component = {Login} />
                <Route path = "/forgot-password" exact component = {Login} />
                <Route path = "/register" exact component = {Login} isRegister = {true}/>
                <Route path = "/search" exact component = {SearchLayout} />
                <Route path = "/search/:propertyId" exact component = {FullPageLayout} />
                <Route path = "/search/:propertyId/payment" exact component = {Payment} />
                <Route path = "/validate/user/:token" exact component = {VerifiedEmail} />
                <Route path = "/validate/owner/:token" exact component = {RegisterHotel}/>
                <Route path = "/:invalid" component = {PageNotFound} />
                </Switch>
            </AuthContext.Provider>
            </div>
       
        );
    }
}


export default Body;