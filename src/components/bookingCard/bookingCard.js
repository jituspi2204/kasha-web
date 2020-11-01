import React from 'react';
import classes from './bookingCard.css';
import Button from '../buttons/styleOne';
let booking = {
    hotelId : '',
    bookingDetails : {
        name : '',
        checkIn : '',
        checkOut : '',
        rooms : 0,
        bookingTime : '',
        payment : '',
        roomNo : [],
    },
    hotelDetails : {
        address : '',
        area : '',
        city : '',
        state : '',
        country : '',
        propertyName : ''
    },
    amount: 0,
    _id : '',
    paymentStatus : false,
    bill : ''
}
const bookingCard = props => {
    booking = props.values;
    const address = booking.hotelDetails.address + ' , ' + 
    booking.hotelDetails.area + ' , ' + 
    booking.hotelDetails.city + ' , ' + 
    booking.hotelDetails.state + ' , ' + 
    booking.hotelDetails.country;
    const review =new Date(booking.bookingDetails.checkOut).getTime() < Date.now() && booking.paymentStatus && !booking.reviewed? 
    (<Button buttonClicked = {(event) => props.buttonClicked(event , booking._id)}>Give Feedback</Button>) : null;
    const cancel = new Date(booking.bookingDetails.checkIn).getTime() >= Date.now() && booking.paymentStatus && !booking.reviewed? 
    (<Button buttonClicked = {() => props.cancelBooking(booking._id , booking.hotelId)}>Cancel Booking</Button>) : null;
    const getRoomNo = () => {
        const temp = booking.bookingDetails.roomNo.map((el ,idx) => {
            return(
                <li>{el}</li>
            )
        })
        return temp;
    }

    return(
        <div className = {classes.self}>
        <div>
            <h2>Booking Time : {booking.bookingDetails.bookingTime}</h2>
            <ul className = {classes.roomsAvailable}>
                {getRoomNo()}
            </ul>
        </div>
            <div  className = {classes.left}>
                <h1>{booking.hotelDetails.propertyName}</h1>
                <h2>Hotel Address :  {address}</h2>
                <h2>Hotel Id : {booking.hotelId}</h2>
                <h2>Booking Id : {booking._id}</h2>
                <h2>Payment status : {booking.paymentStatus ? "Paid" : "Not Paid"}</h2>
            </div>
            <div  className = {classes.right}>
                <h2>Name : {booking.bookingDetails.name}</h2>
                <h2>Check In  : {booking.bookingDetails.checkIn}</h2>
                <h2>Check Out : {booking.bookingDetails.checkOut}</h2>
                <h2>Rooms : {booking.bookingDetails.rooms}</h2>
                <h1>Total Payment : <i>Rs {booking.bookingDetails.payment}/-</i></h1>
            </div>
            {cancel}
            {review}
            <Button><a href = {booking.bill}>Download Receipt</a></Button>
        </div>
    )
}

export default bookingCard;