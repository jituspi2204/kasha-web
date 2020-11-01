import React from "react";
import classes from "./bottom.css";
import Search from "../../../components/search/search";
import delhi from "../../../assets/img/delhi.jpg";
import mumbai from "../../../assets/img/mumbai.jpg";
import goa from "../../../assets/img/goa.jpg";
import shimla from "../../../assets/img/shimla.jpg";
import kolkata from "../../../assets/img/kolkata.jpg";
import chennai from "../../../assets/img/chennai.jpg";
import jaipur from "../../../assets/img/jaipur.jpg";
import bangalore from "../../../assets/img/banglore.jpg";
import agra from "../../../assets/img/agra.jpg";
import udaipur from "../../../assets/img/udaipur.jpg";
import { Link } from "react-router-dom";
class Bottom extends React.Component {
  state = {
    topCities: [
      "Goa",
      "Shimla",
      "Jaipur",
      "Kolkata",
      "Mumbai",
      "Delhi",
      "Chennai",
      "Agra",
      "Udaipur",
      "Bangalore",
    ],
    images: [
      goa,
      shimla,
      jaipur,
      kolkata,
      mumbai,
      delhi,
      chennai,
      agra,
      udaipur,
      bangalore,
    ],
  };
  render() {
    const topCities = this.state.topCities.map((el, idx) => {
      return (
        <Link
          to={{
            pathname: "/search",
            search: `minPrice=${0}&maxPrice=${100000}&minRating=${0}&maxRating=${5}&minRange=${0}&maxRange=${100000}&sortPrice=${1}&sortRating=${-1}&lat=${null}&lng=${null}&city=${el}&rooms=1`,
          }}
        >
          <div className={classes.topCity} key={idx}>
            <div className={classes.cityImage}>
              <img src={this.state.images[idx]} />
            </div>
            <h5>{el}</h5>
          </div>
        </Link>
      );
    });
    return (
      <div className={classes.self}>
        <div className = {classes.headings}>
         <img 
           src = {require('../../../assets/img/heading.png')}
         />
         <h1>Book Youy Hotel Today</h1>
        </div>
        <div className={classes.content}>
          {topCities}
        </div>
        <div className = {classes.searchBox}>
        <Search />
        </div>
      </div>
    );
  }
}

export default Bottom;
