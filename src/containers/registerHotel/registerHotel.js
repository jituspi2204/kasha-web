import React from 'react';
import classes from './registerHotel.css';
import HotelDetails from '../hotelDetails/hotelDetails';
import call from '../../call';
import Logo from '../../containers/header/logo/logoD';
import Popup from '../../assets/messageBox/popup';
import Loader from '../../components/extra/loader';
import {withRouter } from 'react-router-dom';
class RegisterHotel extends React.Component{
    state = {
        popup : null,
        loader : true
    }

    getHotelData = (values) => {
        this.setState({
            ...this.state,
            loader : true
        })
        const form = new FormData();
        values.uploadImages.forEach(el => {
            form.append('uploadImages' , el);
        })
        call({
            method: "post",
            url: "/owner/validate/owner/" + this.props.match.params.token + this.props.location.search,
            data: {
                fields : values.fields,
                roomFacilities : values.roomFacilities,
                hotelFacilities : values.hotelFacilities,
                roomArray : values.roomArray
            },
          }).then(res => {
            if(res.data.status === 'done'){
                this.setState({
                    loader : false,
                    popup : <Popup data = {{status : "success", message : "Your Hotel is Registerd"}} key = {Date.now()}></Popup>
                })
                setTimeout(() => {
                    this.props.history.push("/");
                },1000)
            }
        }).catch(err => {
            this.setState({
                loader :false,
                popup : <Popup data = {{status : "denied", message : err.response.data.message}} key = {Date.now()}></Popup>
            })
        })
    }
    componentDidMount(){
        this.setState({
            ...this.state,
            loader : false
        })
    }

    render(){
        const block = this.state.loader ? <Loader /> : (
            <div className = {classes.self}>
                {this.state.popup}
                <h1>Register Your Hotel / Resort</h1>
                <div className = {classes.logo}>
                <Logo />
                </div>
                
                <HotelDetails HotelDetails = {{}} newHotel = {true} getData = {this.getHotelData} register = {true}/>
            </div>
        )
        return block;
    }
}


export default withRouter(RegisterHotel);