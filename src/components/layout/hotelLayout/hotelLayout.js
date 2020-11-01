import React from "react";
import classes from "./hotelLayout.css";
import Top from "../../../containers/header/top/top";
import Footer from "../../../containers/footer/footer";
import ListItem from "../../listItem/listItem";
import HotelDetails from "../../../containers/hotelDetails/hotelDetails";
import Bookings from "../../../containers/bookings/bookings";
import call from "../../../call";
import AuthContext from "../../../hoc/auth-context";
import PageNotFound from '../../../assets/messageBox/pageNotFound';
import sprite from '../../../assets/svg/sprite.svg';
import Loader from '../../extra/loader';
import ReviewCard from '../../userCard/userCard';
class HotelLayout extends React.Component {
  constructor(props){
    super(props);
  
    this.state = {
      renderBlock: "",
      hotelDetails: {},
      bookings: [],
      reviews : [],
      roomArray : [],
      verified : false,
      showSideBar : false,
      loader : true
    };
    this.sideBarRef = React.createRef();
  }
  changeBlock = (event, id) => {
    if(window.screen.width <= 840){
      let sideBar = !this.state.showSideBar;
    this.setState({
      ...this.state,
      renderBlock: id,
      showSideBar : sideBar
    });
    }else{
    this.setState({
      ...this.state,
      renderBlock: id,
    });
    }
  };

  componentDidMount() {
    
    this.sideBarRef.current.onclick = () => {
      let val = this.state.showSideBar;
      this.setState({
        ...this.state,
        showSideBar : !val
      })
    }
    this.hotelLoginHandler();
  }

  hotelLoginHandler = () => {
    call({
      method: "get",
      url: "/owner/details",
      withCredentials:true
    }).then((res) => {
      console.log(res.data.roomArray);
      this.setState({
        ...this.state,
        verified : true,
        hotelDetails: res.data.result,
        bookings: res.data.result.bookings,
        renderBlock : "hotel-details",
        roomArray : res.data.roomArray,
        reviews : res.data.result.reviews,
        loader : false
      });

      const bl = <AuthContext.Consumer>
        {
          context => {
            context.ownerLoginHandler("owner")
            return <div></div>
          }
        }
      </AuthContext.Consumer>
    });
  }

  render() {
    let translateBar = this.state.showSideBar ? classes.translateBar : null;
    let block;
    if (this.state.renderBlock === "hotel-details") {
      block = <HotelDetails hotelDetails={this.state.hotelDetails} roomArray = {this.state.roomArray} newHotel = {false}/>;
    } else if (this.state.renderBlock === "bookings") {
      block = <Bookings bookings={this.state.bookings} />;
    } else if (this.state.renderBlock === "reviews") {
      block = this.state.reviews.length !== 0 ? <div>
          {
           this.state.reviews.map((el , idx) => {
             return(
               <div key = {idx}>
                  <ReviewCard name = {el.userName} text = {el.text} photo = {el.userPhoto} rating = {el.overallRating}/>
               </div>
             )
           }) 
          }
      </div> : <h2>No Reveiws Found</h2>

    }

        const cp = this.state.verified ?(
        <div className={`${classes.self}`}>
        <Top owner = {this.state.verified}/>
        <div className={`${classes.sideBar} ${translateBar}`}>
          <ListItem
            itemClicked={(event) => this.changeBlock(event, "hotel-details")}
            classN={
              this.state.renderBlock === "hotel-details" ? classes.active : null
            }
          >
            Hotel Details
          </ListItem>
          <ListItem
            itemClicked={(event) => this.changeBlock(event, "bookings")}
            classN={
              this.state.renderBlock === "bookings" ? classes.active : null
            }
          >
            Bookings
          </ListItem>
          <ListItem
            itemClicked={(event) => this.changeBlock(event, "reviews")}
            classN={
              this.state.renderBlock === "reviews" ? classes.active : null
            }
          >
            Reviews
          </ListItem>
        </div>
        <div className={classes.mainContent}>{block}</div>
        <Footer />
      </div>
               ) : (<PageNotFound />)
      let rotateClass = this.state.showSideBar ? classes.rotateRight:null;
    return <div>
    <svg className = {`${classes.sideBarMenu} ${rotateClass}`} ref={this.sideBarRef}> 
          <use xlinkHref = {`${sprite}#icon-chevron-thin-left`}></use>
        </svg>
        {this.state.loader ? <Loader /> : cp}
    </div>
     
  }
}

export default HotelLayout;
