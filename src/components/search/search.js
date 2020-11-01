import React from "react";
import classes from "./search.css";
import Input from "../input/input";
import Find from "../buttons/styleOne";
import SearchSuggestion from "../../containers/searchSuggestion/searchSuggestion";
import { Link } from "react-router-dom";
class Search extends React.Component {
  state = {
    city: "",
    room: '',
    in: "",
    out: "",
  };
  valueChanged = (event, id) => {
    if (id === "room") {
      if(event.target.value < 1 || event.target.value > 10){
        this.setState({
          ...this.state,
          room: '',
        });
      }else{
        this.setState({
          ...this.state,
          room: event.target.value,
        });
      }
      
    } else if (id === "in") {
      this.setState({
        ...this.state,
        in: event.target.value,
      });
    } else if (id === "out") {
      this.setState({
        ...this.state,
        out: event.target.value,
      });
    }
  };

  getInputValue = (value) => {
    this.setState({
      ...this.state,
      city: value,
    });
  };

  render() {

      
    return (
      <div className={classes.self}>
        <div className={classes.searchField}>
          <div className = {classes.fields}>
          <h2>City</h2>
          <SearchSuggestion
            names="search"
            ph="City"
            valueChanged={this.getInputValue}
            values={window.cities}
          />
          </div>
          <div className = {classes.fields}>
          <h2>Rooms</h2>
          <Input
            types="number"
            names="search"
            ph="Rooms"
            val = {this.state.room}
            changed={(event) => {
              this.valueChanged(event, "room");
            }}
          />
          </div>
          <div className = {classes.fields}>
          <h2>Check In</h2>
          <Input
            types="date"
            names="checkIn"
            ph="From"
            id="checkIn"
            changed={(event) => {
              this.valueChanged(event, "in");
            }}
          />
          </div>
          <div className = {classes.fields}>
          <h2>Check Out</h2>
          <Input
            types="date"
            names="checkOut"
            id="checkOut"
            changed={(event) => {
              this.valueChanged(event, "out");
            }}
          />
          </div>
          <Find>
          <Link
            to={{
              pathname: "/search",
              search:
              `minPrice=${0}&maxPrice=${100000}&minRating=${0}&maxRating=${5}&minRange=${0}
            &maxRange=${100000}&sortPrice=${1}&sortRating=${-1}&lat=${null}&lng=${null}&city=${this.state.city}&rooms=${this.state.room}`
            }}
          >
            Find
          </Link>
          </Find>
        </div>
      </div>
    );
  }
}

export default Search;
