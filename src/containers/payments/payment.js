import React from 'react';
import classes from './payment.css';
import Left from '../../components/loginItems/loginLeft';
import Input from '../../components/input/input';
import Buttom from '../../components/buttons/styleOne';
import Button from '../../components/buttons/styleTwo';
import call from '../../call';
import Spinner from '../../assets/messageBox/sideSpinner/sideSpinner';
// const stripe = window.Stripe('pk_test_51GxTInFEJGp6iAWuSq3oN4RUgvDaE7el0Ky9gDqhP9oOlu0tTdBONtZ1p3KwSQvikRTb9tDvxGUzdzuTHMUt1UnG00SDoxmmdd');
class Payment extends React.Component{
    state = {
        booking : {
            hotelId : '',
            hotelName : '',
            rooms: '',
            address : '',
            name : '',
            in : '',
            out : '',
            payment : 0,
            days : 0,
            roomId : [],
            roomNo : [],
            cupon : ''
        },
        detailsVerified : false,
        amount : 0,
        loader : true,
        spinner : false
    }
    detailsVerified = () => {
        this.setState({
            ...this.state,
            detailsVerified : true,
        })
    }
    cancelPayment = () => {
        this.setState({
            ...this.state,
            detailsVerified : false
        })
        
        this.props.history.push("/search/" + this.props.match.params.propertyId);
    }
    componentDidMount() {
       
        const query = new URLSearchParams(this.props.location.search);
        let bookingDetails = {
            hotelId : '',
            hotelName : '',
            rooms: '',
            address : '',
            name : '',
            in : '',
            out : '',
            payment : 0,
            days : 0,
            roomId : [],
            roomNo : [],
            cupon : ''

        };
        for (let param of query.entries()) {
            if(param[0] === 'name'){
                bookingDetails.name = param[1];
            }else if(param[0] === 'id'){
                bookingDetails.hotelId = param[1];
            }else if(param[0] === 'in'){
                bookingDetails.in = param[1];
            }else if(param[0] === 'out'){
                bookingDetails.out = param[1];
            }else if(param[0] === 'room'){
                bookingDetails.rooms = param[1]
            }else if(param[0] === 'days'){
                bookingDetails.days = param[1];
            }else if(param[0] === 'payment'){
                bookingDetails.payment = param[1];
            }else if(param[0] === 'roomId'){
                let arr = param[1].split(' ');
                bookingDetails.roomId = arr;
            }else if(param[0] === 'roomNo'){
                let arr = param[1].split(' ');
                bookingDetails.roomNo = arr;
            }else if(param[0] === 'cupon'){
                bookingDetails.cupon = param[1];
            }
           
        }
        // let amount;
        call.get('/api/v1/' + bookingDetails.hotelId)
        .then(res => {
            let data = {...res.data.result[0]};
            let amount = data.amount - data.discount;
            bookingDetails.address =  (data.location.address +
            " , " +
            data.location.area +
            " , " +
            data.location.city +
            " , " +
            data.location.state);
            bookingDetails.hotelName = data.propertyName;   
            this.setState({
                ...this.state,
                booking : {
                    ...this.state.booking,
                    ...bookingDetails,
                },
                amount,
                loader :false
            })
            
        }).catch(err => {
            alert("error while booking hotel, try after sometime")
            this.setState({
                loader : false
            })
        })
    }

    bookingHandler = () => {
        this.setState({
           loader : true
        })
        call({
            method : 'post',
            url : '/book-hotel/' + this.state.booking.hotelId,
            data : {
                bookingDetails : {
                    rooms : this.state.booking.rooms,
                    roomType : "",
                    checkIn : new Date(this.state.booking.in),
                    checkOut : new Date(this.state.booking.out),
                    name : this.state.booking.name,
                    bookingTime : new Date(Date.now()),
                    days : this.state.booking.days,
                    roomId : this.state.booking.roomId,
                    roomNo : this.state.booking.roomNo,
                    cupon : this.state.booking.cupon
                }
            },
            withCredentials : true
        }).then(res => {
            this.setState({
                loader : false
            })
            this.props.history.push('/me');
        }).catch(err => {
            this.setState({
                loader : false
            })
        })
    }

    getRoomDetails = () => {
        const temp = this.state.booking.roomId.map((el , idx) => {
            return (
                <li key = {idx}> {"Room Id - " + el}<br/> {"Room No - " + this.state.booking.roomNo[idx]}</li>
            )
        })
        return temp;
    }
    render(){
        const paymentCard = this.state.detailsVerified ? (<div className = {classes.paymentCard}>
            <div>
                <h1>{this.state.booking.hotelName}</h1>
                <h2> {this.state.booking.address}</h2>
                <h2>{this.state.booking.hotelId}</h2>
            </div>
            <div>
                <h2>Name : {this.state.booking.name}</h2>
                <h2>From : {this.state.booking.in}</h2>
                <h2>To : {this.state.booking.out}</h2>
                <h2>Rooms :{this.state.booking.rooms}</h2>
                <h1>Total Payment : Rs {this.state.booking.payment}/-</h1>
                <Buttom buttonClicked = {this.bookingHandler}>Make Payment</Buttom>
                <Button buttonClicked = {this.cancelPayment}>Cancel Booking</Button>
            </div>
            
            </div>) : (
                <div className= {classes.paymentBlock}>
                <h1>Verify Booking Details</h1>
                <h2>Name</h2>
                <Input types = "text" names = "name" val = {this.state.booking.name} />
                <h2>Rooms</h2>
                <Input types = "Number" names = "room" val = {this.state.booking.rooms}/>
                <div className = {classes.dateBox}>
                    <h2>Check In</h2>
                    <Input types = "date" names= "checkin" val = {this.state.booking.in} />
                </div>
                <div className = {classes.dateBox}>
                    <h2>Check Out</h2>
                    <Input types = "date" names= "checkin" val = {this.state.booking.out} />
                </div>
                <h2>
                    Days
                </h2>
                <Input types = "number" names= "checkin" val = {this.state.booking.days} />
                <h2>
                    Payment : Rs
                </h2>
                <Input types = "number" names= "checkin" val = {this.state.booking.payment} />
                <h2>
                    Room Selected
                </h2>
                <ul className = {classes.roomsAvailable}>
                    {this.getRoomDetails()}
                </ul>
                <Buttom buttonClicked = {this.detailsVerified}>Confirm Details</Buttom>
                <Button buttonClicked = {this.cancelPayment}>Change Details </Button>
           </div>
            );
        return(
            <div className = {classes.self}>
                {this.state.loader ? <Spinner /> : null}
                <Left />
                {paymentCard}
            </div>
        )
    }
}

export default Payment;