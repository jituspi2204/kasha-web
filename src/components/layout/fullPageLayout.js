import React from "react";
import classes from "./layout.css";
import Top from "../../containers/header/top/top";
import sprite from "../../assets/svg/sprite.svg";
import spriteIcon from "../../assets/menu/sprite.svg";
import Button from "../buttons/styleOne";
import ButtonT from "../buttons/styleTwo";
import UserCard from "../userCard/userCard";
import Footer from "../../containers/footer/footer";
import NoData from "../../assets/messageBox/noData";
import { Link } from "react-router-dom";
import AuthContext from "../../hoc/auth-context";
import RatingBox from "../../containers/reviewBox/hotelReviewBox";
import call from "../../call";
import SimilarHotels from "../hotelCard/displayCard";
import Map from "../../containers/map/map";
import Loader from "../extra/loader";
import Spinner from "../../assets/messageBox/sideSpinner/sideSpinner";
import AllRatings from '../crossCard/crossCard';
import {hostname} from '../../assets/constants/variables';
const mapToIcon = {
  "Wifi" : "icon-connection",
  "Air Conditioner" : "icon-air",
  "Newspaper" : "icon-newspaper-o",
  "Food" : "icon-fastfood",
  "Fans" : "icon-toys",
  "Phone Service" : "icon-phone",
  "Coffe Maker" : "icon-coffee",
  "Hanger" : "icon-dry_cleaning",
  "Private Bathroom" : "icon-airline_seat_legroom_normal",
  "Television" : "icon-tv",
  "Food and Beverage" : "icon-spoon-knife",
  "Laundry" : "icon-local_laundry_service",
  "Parking" : "icon-directions_car",
  "Alarm Service" : "icon-alarm",
  "Security" : "icon-security",
  "Resturant" : "icon-spoon-knife",
  "Internet" : "icon-connection"
}

class FullPageLayout extends React.Component {
  state = {
    roomAvailable: false,
    error: null,
    booking: {
      hotelId: "",
      hotelName: "",
      address: "",
      name: "",
      in: "",
      out: "",
      room: 0,
      days: 0,
      payment: 0,
      roomSelected: [],
      roomSelectedId: [],
      cupon: "",
      isValidCupon: null,
    },
    roomsAvailable: [],
    similarHotels: [],
    hasData: false,
    hotel: {
      propertyId: "",
      propertyName: "",
      location: {
        address: "",
        area: "",
        city: "",
        state: "",
        country: "",
        points: {
          type: "Point",
          coordinates: [],
        },
      },
      roomCount: 1,
      userRating: 0,
      amount: 0,
      discount: 0,
      coverImage: [],
      roomFacilitiesArray: [],
      hotelFacilitiesArray: [],
      hotelDescription: "",
      hotelStarRating: "",
      rating: 0,
      ratingOne: 0,
      ratingTwo: 0,
      ratingThree: 0,
      ratingFour: 0,
      ratingFive: 0,
      totalUsers: 0,
      reviews: [],
    },
    loader: true,
    spinner: false,
    showAllRatings : false
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.match.params.propertyId !== nextProps.match.params.propertyId
    ) {
      window.location.reload();
    }
    return true;
  }

  compareDate(first, second) {
    let firstDate = new Date(first);
    let secondDate = new Date(second);
    if (firstDate.getUTCFullYear() === secondDate.getUTCFullYear()) {
      if (firstDate.getUTCMonth() === secondDate.getUTCMonth()) {
        if (firstDate.getUTCDate() > secondDate.getUTCDate()) {
          return 1;
        } else if (firstDate.getUTCDate() === secondDate.getUTCDate()) {
          return 0;
        } else {
          return -1;
        }
      } else if (firstDate.getUTCMonth() > secondDate.getUTCMonth()) {
        return 1;
      } else {
        return -1;
      }
    } else if (firstDate.getUTCFullYear() > secondDate.getUTCFullYear()) {
      return 1;
    } else {
      return -1;
    }
  }

  componentDidMount() {
    window.prevLocation = this.props.location.pathname;
    call
      .get(`/api/v1/${this.props.match.params.propertyId}`)
      .then((res) => {
        if (res.data.result.length !== 0) {
          let urlOne = `/api/v1/hotels?minPrice=${
            res.data.result[0].amount - 500 >= 0
              ? res.data.result[0].amount - 500
              : 0
          }&maxPrice=${res.data.result[0].amount + 500}&minRating=${
            res.data.result[0].userRating - 1 > 0
              ? res.data.result[0].userRating - 1
              : 0
          }&maxRating=${
            res.data.result[0].userRating + 1 < 5
              ? res.data.result[0].userRating + 1
              : 5
          }&minRange=${0}`;
          let urlTwo = `&maxRange=${40}&sortPrice=${1}&sortRating=${1}&lat=${
            res.data.result[0].location.points.coordinates[1]
          }&lng=${res.data.result[0].location.points.coordinates[0]}&city=${
            res.data.result[0].location.city
          }&rooms=1`;
          call
            .get(urlOne + urlTwo)
            .then((resData) => {
              let topFive = [];
              resData.data.result.forEach((el, idx) => {
                if (idx < 7) {
                  topFive.push(el);
                }
              });
              this.setState({
                ...this.state,
                loader: false,
                similarHotels: topFive,
                hotel: { ...res.data.result[0] },
                hasData: true,
                booking: {
                  ...this.state.booking,
                  hotelId: res.data.result[0].propertyId,
                  hotelName: res.data.result[0].propertyName,
                  address:
                    res.data.result[0].location.address +
                    " , " +
                    res.data.result[0].location.area +
                    " , " +
                    res.data.result[0].location.city +
                    " , " +
                    res.data.result[0].location.state,
                },
              });
            })
            .catch((err) => {
              this.setState({
                ...this.state,
                loader: false,
                hotel: { ...res.data.result[0] },
                hasData: true,
              });
            });
        } else {
          this.setState({
            ...this.state,
            loader: false,
            hasData: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loader: false,
        });
      });
  }
  getStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i <= rating && rating !== 0) {
        stars.push(
          <svg key={i + 100} className={classes.fillGreen}>
            <use xlinkHref={`${sprite}#icon-star`}></use>
          </svg>
        );
      } else {
        stars.push(
          <svg key={i + 100} className={classes.fillGrey}>
            <use xlinkHref={`${sprite}#icon-star`}></use>
          </svg>
        );
      }
    }
    return stars;

  };

  closeAllRatings = () => {
    this.setState({
      ...this.state, 
      showAllRatings : false
    })
  }
  getImages = (image) => {
    let images = [];
    for (let i = 0; i < image.length; i++) {
      images.push(<img key={i + 300} src={image[i]} alt = "Hotel" />);
    }
    return images;
  };
  getService = (service, icon) => {
    let services = [];
    for (let i = 0; i < 10 && i < service.length; i++) {
      if (service[i].length < 50) {
        services.push(
          <li key={i + 500}>
            <svg>
              <use xlinkHref={`${spriteIcon}#${mapToIcon[service[i]]}`}></use>
            </svg>
            {service[i]}
          </li>
        );
      }
    }
    return services;
  };

  getBookingDetails = (event, id) => {
    if (id === "name") {
      this.setState({
        ...this.state,
        booking: {
          ...this.state.booking,
          name: event.target.value,
        },
      });
    } else if (id === "in") {
      this.setState({
        ...this.state,
        booking: {
          ...this.state.booking,
          in: event.target.value,
          roomAvailable: false,
        },
      });
    } else if (id === "out") {
      this.setState({
        ...this.state,
        booking: {
          ...this.state.booking,
          out: event.target.value,
          roomAvailable: false,
        },
      });
    } else if (id === "room") {
      this.setState({
        ...this.state,
        booking: {
          ...this.state.booking,
          room: parseInt(event.target.value),
          roomsAvailable: false,
        },
      });
    } else if (id === "cupon") {
      this.setState({
        ...this.state,
        booking: {
          ...this.state.booking,
          cupon: event.target.value.toUpperCase(),
          roomsAvailable: false,
          isValidCupon : null,
        },
      });
    }
  };
  validateBookingDetails = () => {
    this.setState({
      spinner: true,
    });
    let status = true;
    let error = "";
    if (this.state.booking.name === "") {
      status = false;
      error += "Name should not be empty\n";
    }
    if (
      this.state.booking.room > 20 ||
      this.state.booking.room < 1 ||
      this.state.booking.room === ""
    ) {
      status = false;
      error += "Room Should lie b/w 1 and 10\n";
    }
    if (
      this.compareDate(this.state.booking.in, Date.now()) === -1 ||
      this.state.booking.in === ""
    ) {
      status = false;
      error += "Check In Date should be greater than equal to Today\n";
    }
    if (
      this.compareDate(this.state.booking.out, this.state.booking.in) !== 1 ||
      this.state.booking.out === ""
    ) {
      status = false;
      error += "Check Out should be greater than Check In Date\n";
    }
    if (this.state.hotel.roomCount < this.state.booking.room) {
      status = false;
      error += "No room available for this Hotel\n";
    }
    if (status) {
      let time =
        new Date(this.state.booking.out).getTime() -
        new Date(this.state.booking.in).getTime();
      let days = Math.ceil(time / (60 * 60 * 24 * 1000));
      call({
        method: "get",
        url: "/api/v1/check/" + this.state.hotel.propertyId,
      })
        .then((res) => {
          const rooms = res.data.rooms;
          let checkInDate = new Date(this.state.booking.in);
          let checkOutDate = new Date(this.state.booking.out);
          let roomsAvailable = rooms.filter((el) => {
            let status = true;
            if (el.date.length !== 0) {
              for (let i = 0; i < el.date.length; i++) {
                let dt = new Date(el.date[i]);
                if (dt > checkInDate && dt < checkOutDate) {
                  status = false;
                  break;
                }
              }
            }
            return status;
          });
          if (roomsAvailable.length >= this.state.booking.room) {
            this.setState({
              ...this.state,
              roomAvailable: true,
              error,
              booking: {
                ...this.state.booking,
                days,
              },
              roomsAvailable,
              spinner: false,
            });
          } else {
            this.setState({
              ...this.state,
              roomAvailable: false,
              error,
              booking: {
                ...this.state.booking,
                days,
              },
              roomsAvailable: [],
              spinner: false,
            });
          }
        })
        .catch((err) => {});
    } else {
      alert(error);
      this.setState({
        ...this.state,
        roomAvailable: false,
        error,
        spinner: false,
      });
    }
  };

  validateCupon = () => {
    if(this.state.booking.cupon !== ''){
    call({
      method: "GET",
      url: "/validate-cupon/" + this.state.booking.cupon,
      withCredentials: true,
    }).then((res) => {
      if (res.data.status === "success" && this.state.booking.roomSelected.length !== 0) {
        let payment = this.state.booking.payment - parseInt(this.state.booking.cupon.split('-').pop());
        this.setState({
          ...this.state,
          booking: {
            ...this.state.booking,
            isValidCupon: true,
            payment
          },
        });
      } else {
        this.setState({
          ...this.state,
          booking: {
            ...this.state.booking,
            isValidCupon: false,
          },
        });
      }
    });
  }
  };

  removeCupon = ()=>{
    let payment = this.state.booking.payment + parseInt(this.state.booking.cupon.split('-').pop());
    this.setState({
      ...this.state,
      booking :{
        ...this.state.booking,
        isValidCupon :null,
        cupon : '',
        payment
      }
    })
  }
  getAvailableRooms = () => {
    const result = this.state.roomsAvailable.map((el, idx) => {
      return (
        <li
          key={idx}
          onClick={(event) => this.selectRooms(event, el.roomNo, el._id , el)}
        >
          {el.roomType + " Room"}
          <br />
          {"Room no " + el.roomNo}
          <br />
          {"Rs " + el.price + " per day"}
        </li>
      );
    });
    result.unshift(
      <div className={classes.cuponInput} key={10000}>
        <input
          type="text"
          placeholder="Have Cupon"
          value = {this.state.booking.cupon}
          onChange={(event) => this.getBookingDetails(event, "cupon")}
        ></input>
        {this.state.booking.isValidCupon === null ? (
          <Button buttonClicked = {this.validateCupon}>Validate</Button>
        ) : this.state.booking.isValidCupon ? (
          <div>
          <Button>Rs {this.state.booking.cupon.split("-").pop() + " off"}</Button>
          <Button buttonClicked = {this.removeCupon}>Remove</Button>
          </div>
        ) : (
          <Button>Invalid Cupon</Button>
        )}
      </div>
    );
    return result;
  };

  selectRooms = (event, val, id ,el) => {
    if(this.state.booking.room >= this.state.booking.roomSelected.length){
      let selectedRooms = this.state.booking.roomSelected;
      let selectedRoomsId = this.state.booking.roomSelectedId;
      let index = selectedRooms.indexOf(val);
      let payment = this.state.booking.payment;
      console.log(payment , "---->");
      if (selectedRooms.length < this.state.booking.room && index === -1) {
        selectedRooms.push(val);
        selectedRoomsId.push(id);
        payment += (parseInt(el.price) - parseInt(el.discount)) * parseInt(this.state.booking.days); 
        event.target.classList.add(classes.selectRoom);
      } else if (index !== -1) {
        selectedRooms.splice(index, 1);
        selectedRoomsId.splice(index, 1);
        payment -= (parseInt(el.price) - parseInt(el.discount)) * parseInt(this.state.booking.days);
        event.target.classList.remove(classes.selectRoom);
      }
      console.log(payment , "====>");
      this.setState({
        ...this.state,
        booking: {
          ...this.state.booking,
          roomSelected: selectedRooms,
          roomSelectedId: selectedRoomsId,
          payment
        },
      });

    }
    
  };

  getRoomString = () => {
    let temp = this.state.booking.roomSelectedId.join(" ");
    return temp;
  };
  getRoomNoString = () => {
    let temp = this.state.booking.roomSelected.join(" ");
    return temp;
  };
  render() {
    const hotelBlock = this.state.similarHotels.map((el, id) => {
      if (el.propertyId !== this.state.hotel.propertyId)
        return (
          <div className={classes.similarHotelsBlock}>
            <SimilarHotels
              cityName={el.propertyName}
              image={el.coverImage[0]}
              priceRange={el.amount}
              propertyId={el.propertyId}
            />
          </div>
        );
      else return null;
    });
    const ratingBlocks = this.state.hotel.reviews.map((el, id) => {
      if (id <= 5)
        return (
          <UserCard
            name={el.userName}
            text={el.text}
            rating={el.overallRating}
            key={id}
            photo={el.userPhoto}
          />
        );
      else return null;
    });
    const hotelData = { ...this.state.hotel };
    const bookingData = { ...this.state.booking };
    const block =
      this.state.hasData === false ? (
        <NoData />
      ) : (
        <React.Fragment>
          <div className={classes.propertyDetails}>
            <div className={classes.leftDetails}>
              <h1>{hotelData.propertyName}</h1>
              <h2>
                {hotelData.location.address +
                  " , " +
                  hotelData.location.area +
                  " , " +
                  hotelData.location.city +
                  " , " +
                  hotelData.location.state +
                  " , " +
                  hotelData.location.country}
              </h2>
              <h2>{this.getStars(hotelData.rating)}</h2>
            </div>
            <div className={classes.rightDetails}>
              <h1>Rs {hotelData.amount - hotelData.discount}</h1>
              <h4>per room</h4>
              <h2>
                <strike>Rs {hotelData.amount}</strike> of{" "}
                {(
                  (hotelData.discount /
                    (hotelData.amount === 0 ? 1 : hotelData.amount)) *
                  100
                ).toFixed(0)}
                %
              </h2>
              <Button>{hotelData.hotelStarRating}</Button>
            </div>
          </div>
          <div className={classes.images}>
            {this.getImages(hotelData.coverImage)}
          </div>
          <div className={classes.description}>
            <h1>About Hotel</h1>
            <p>{hotelData.hotelDescription}</p>
            <h1>Location</h1>
            <div className={classes.map}>
              <Map
                currentLoc={{
                  lat: this.state.hotel.location.points.coordinates[1],
                  long: this.state.hotel.location.points.coordinates[0],
                }}
                locations={[
                  {
                    location: this.state.hotel.location.points.coordinates,
                    propertyName: this.state.hotel.propertyName,
                  },
                ]}
              />
            </div>
          </div>
          <div className={classes.bookingDetails}>
            <h1>Book Now</h1>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(event) => this.getBookingDetails(event, "name")}
            ></input>
            <input
              type="date"
              className={classes.checkIn}
              onChange={(event) => this.getBookingDetails(event, "in")}
            ></input>
            <input
              type="date"
              className={classes.checkOut}
              onChange={(event) => this.getBookingDetails(event, "out")}
            ></input>
            <input
              type="Number"
              min="1"
              max="10"
              placeholder="Rooms"
              onChange={(event) => this.getBookingDetails(event, "room")}
            ></input>
            <h2>Total Amount : Rs {this.state.booking.payment}</h2>
            <ul className={classes.roomsAvailable}>
              {this.state.roomsAvailable.length !== 0 ? (
                <h2 style={{ width: "100%" }}>Select Rooms</h2>
              ) : null}
              {this.getAvailableRooms()}
            </ul>
            <div className={classes.paymentButtons}>
              <Button buttonClicked={this.validateBookingDetails}>Check</Button>
              {this.state.roomAvailable ? (
                <svg className={classes.checkAvail}>
                  <use xlinkHref={`${sprite}#icon-thumbs-up`}></use>
                </svg>
              ) : (
                <svg
                  className={classes.checkAvail}
                  style={{ borderColor: "red" }}
                >
                  <use
                    xlinkHref={`${sprite}#icon-thumbs-down`}
                    style={{ fill: "red" }}
                  ></use>
                </svg>
              )}
              <AuthContext.Consumer>
                {(context) => {
                  return context.userType ===
                    "owner" ? null : !context.isLoggedIn ? (
                    <Button>
                      <Link
                        to={{
                          pathname: "/login",
                        }}
                      >
                        Login First
                      </Link>
                    </Button>
                  ) : this.state.roomAvailable ? (
                    <Button>
                      {this.state.booking.roomSelected.length ===
                      this.state.booking.room ? (
                        <Link
                          to={{
                            pathname: this.props.location.pathname + "/payment",
                            search: `name=${bookingData.name}&id=${
                              bookingData.hotelId
                            }&in=${bookingData.in}&out=${
                              bookingData.out
                            }&room=${bookingData.room}&days=${
                              bookingData.days
                            }&payment=${
                              bookingData.payment
                            }&roomId=${this.getRoomString()}&roomNo=${this.getRoomNoString()}&cupon=${this.state.booking.cupon}`,
                          }}
                        >
                          Book Now
                        </Link>
                      ) : (
                        "Select Room"
                      )}
                    </Button>
                  ) : null;
                }}
              </AuthContext.Consumer>
            </div>
            <div className={classes.userCard}>
              <h1>User Reviews</h1>
              {ratingBlocks}
              {ratingBlocks.length === 0 ? (
                <h2>No Rating Found</h2>
              ) : ratingBlocks.length > 5 ? (
               <ButtonT buttonClicked = {() => {this.setState({...this.state , showAllRatings : true})}}>See all ratings</ButtonT>
              ) : null}
            </div>
          </div>
          <div className={classes.userRating}>
            <RatingBox
              value={[
                this.state.hotel.ratingOne,
                this.state.hotel.ratingTwo,
                this.state.hotel.ratingThree,
                this.state.hotel.ratingFour,
                this.state.hotel.ratingFive,
              ]}
              total={this.state.hotel.totalUsers}
              rating={this.state.hotel.rating}
            />
          </div>
          <div className={classes.similarHotels}>
            <h1>Room Facilities</h1>
            <ul className={classes.roomService}>
              {this.getService(hotelData.roomFacilitiesArray, "plus")}
            </ul>
            <h1>Hotel Facilities</h1>
            <ul className={classes.services}>
              {this.getService(hotelData.hotelFacilitiesArray, "thumbs-up")}
            </ul>
          </div>
        </React.Fragment>
      );
    return this.state.loader ? (
      <Loader />
    ) : (
      <div className={classes.fullPageLayout}>
        <Top />
        <div className = {classes.fullPageOfferZone}>
          <img src = {hostname + "/offers/offer-search.jpg"}/>
        </div>
        {block}
        {this.state.spinner ? <Spinner /> : null}
        <div className={classes.extraHotels}>{hotelBlock}</div>
        {/* <Route path = {this.props.location.pathname + "/payment"} exact component = {Payment}/> */}
        {/* jitendra  { this.props.match.params.propertyId} */}
        {this.state.showAllRatings ? <AllRatings reviewList = {this.state.hotel.reviews} close = {this.closeAllRatings}/> : null}
        <Footer />
      </div>
    );
  }
}

export default FullPageLayout;
