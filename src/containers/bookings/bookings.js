import React from "react";
import classes from "./bookings.css";
import Button from "../../components/buttons/styleTwo";
import Input from "../../components/input/input";

class Bookings extends React.Component {
  state = {
    result: [],
    renderBlock : true,
    user : ''
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      result: [...this.props.bookings],
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      this.setState({
        result: this.props.bookings,
      });
      return true;
    }
    if (this.state.result !== nextState.result) {
      return true;
    }
    if(this.state.renderBlock !== nextState.renderBlock){
        return true;
    }
    return false;
  }

  findByName = (event) => {
    if (event.which === 13) {
      let result = [];
      let name = event.target.value;
      let tname = name.trim();
      let regx = new RegExp("^" + name, "i");
      this.props.bookings.forEach((el, idx) => {
        if (
          el.bookingDetails.name === tname ||
          regx.test(el.bookingDetails.name)
        ) {
          result.push(el);
        }
      });
      this.setState({
        ...this.state,
        result,
      });
      event.target.value = "";
    }
    
  };

  findById = (event) => {
    if (event.which === 13) {
      let result = [];
      let id = event.target.value;
      this.props.bookings.forEach((el, idx) => {
        if (el._id === id) {
          result.push(el);
        }
      });
      this.setState({
        ...this.state,
        result,
      });
      event.target.value = "";
    }

  };
  findByBookingDate = (event) => {
        
      let result = [];
      let date = new Date(event.target.value);
      this.props.bookings.forEach((el, idx) => {
        let dt = new Date(el.bookingDetails.bookingTime);
        if (
            dt.getUTCFullYear() === date.getUTCFullYear()  &&
          dt.getUTCMonth() === date.getUTCMonth()  &&
          dt.getUTCDate() === date.getUTCDate()
        ) {
          result.push(el);
        }
      });
      this.setState({
        ...this.state,
        result,
      });
      event.target.value = "";
  };

  getFullDetails = () => {
      this.setState({
          ...this.state,
          renderBlock : false
      })
  }

  detailsHandler = (event , id) => {
      
      let details;
      this.props.bookings.forEach((el , idx) => {
          if(el._id === id){
              details = {...el}
          }
      });
      this.setState({
        ...this.state,
        renderBlock : false,
        user : details
    })
  }
  goBack = () => {
      this.setState({
          ...this.state,
          renderBlock : true
      })
  }
  getAllResult = ()=>{
      const rr = [...this.props.bookings]
      this.setState({
          ...this.state,
          result : rr
      })
  }
  render() {

    let block;
    const bookingBlock = this.state.result.map((el, idx) => {
      return (
        <tr>
          <td>{el._id}</td>
          <Button buttonClicked={(event) => this.detailsHandler(event , el._id)}>Details</Button>
        </tr>
      );
    });
    let bookings = (
        <div className={classes.self}>
        <div className={classes.filter}>
          <h1>Filter By</h1>
          <div>
            <h2>Date</h2>
            <Input types="date" selected = {this.findByBookingDate}/>
          </div>
          <div>
            <h2>Booking Id</h2>
            <Input types="text" ph="Enter Booking Id"  keyPressed={this.findById}/>
          </div>
          <div>
            <h2>Name</h2>
            <Input
              types="text"
              ph="Enter Name"
              keyPressed={(event) => this.findByName(event, "name")}
            />
          </div>
          <Button buttonClicked = {this.getAllResult}>All Bookings</Button>
        </div>
        <table>
          <tr>
            <th>Booking Id</th>
            <th></th>
          </tr>
          {bookingBlock}
        </table>
      </div>
    );
      
    let rooms = null;
    if(this.state.user){
      rooms =  this.state.user.bookingDetails.roomNo.map((el , idx) => {
        return (
          <h2 key = {idx}>
            {el}
          </h2>
        )
      })
    }
    block = this.state.renderBlock  ? bookings : 
        (
            <div className = {classes.self}>
            <div className = {classes.userBookings}>
            <h2>Booking Id  :  {"\t\t" + this.state.user._id} </h2>
                <h2>User Name : {"\t\t" +this.state.user.bookingDetails.name}</h2>
                <h2>User Id : {"\t\t" +this.state.user.userId}</h2>
                <h2>Booking Time : {"\t\t" +this.state.user.bookingDetails.bookingTime}</h2>
                <h2>Check In : {"\t\t" +this.state.user.bookingDetails.checkIn}</h2>
                <h2>Check Out : {"\t\t" +this.state.user.bookingDetails.checkOut}</h2>
                <h2>Amount : {"\t\t" +this.state.user.amount}</h2>
                <h2>Discount : {"\t\t" +this.state.user.discount}</h2>
                <h2>Total Payment : {"\t\t" +this.state.user.bookingDetails.payment}</h2>
                <h2>Payment Status : {"\t\t" +this.state.user.paymentStatus ? "Paid" : "Unpaid"} </h2>
                <h2>Rooms</h2>
                {rooms}

            </div>
               <Button buttonClicked = {this.goBack}>All Bookings</Button>
            </div>
        )
    return (
        block
    );
  }
}

export default Bookings;
