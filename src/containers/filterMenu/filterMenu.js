import React from "react";
import classes from "./filterMenu.css";
import Slider from "../../components/input/slider";
import SingleSlider from "../../components/input/singleSlider";
import CheckBox from "../../components/input/chechBox";
import Button from "../../components/buttons/styleOne";
import SearchSuggesiton from "../searchSuggestion/searchSuggestion";
import {withRouter } from "react-router-dom";
import Toggler from '../../components/input/toggler';
const datas = {
  city: '',
  price: {
    max: 1000000,
    min: 0,
  },
  range: {
    max: 1000000,
    min: 0,
  },
  rating: {
    max: 5,
    min: 0,
  },
  priceCheck: {
    asc: 0,
    desc: 0,
  },
  ratingCheck: {
    asc: 0,
    desc: 0,
  },
  lng: null,
  lat: null,
  rooms : 0
};

class FilterMenu extends React.Component {
  state = {
    cities : []
  };
  componentDidMount(){
    // call('/api/v1/cities')
    // .then(res => {  
    //     this.setState({
    //         ...this.state,
    //         cities :res.data.result
    //     })
    // }).catch(err => {
    // })
  }

  updateValues = (values, id) => {
    if (id === "price") {
      datas.price.max = values.maxValue;
      datas.price.min = values.minValue;
    } else if (id === "range") {
      datas.range.max = values.maxValue;
      datas.range.min = values.minValue;
    } else if (id === "rating") {
      datas.rating.max = values.maxValue;
      datas.rating.min = values.minValue;
    } else if (id === "ratingCheck") {
      datas.ratingCheck.asc = values.asc;
      datas.ratingCheck.desc = values.desc;
    } else if (id === "priceCheck") {
      datas.priceCheck.asc = values.asc;
      datas.priceCheck.desc = values.desc;
    } else if (id === "searchCity") {
      datas.city = values;
    } else if(id === 'rooms'){
      datas.rooms = values.minValue;
    }
  };

  getLocation = (useLocation) => {
    if(useLocation){
    window.navigator.geolocation.getCurrentPosition(
      (res) => {
        datas.lat = res.coords.latitude;
        datas.lng = res.coords.longitude;

      },
      (err) => {
        
       
      }
    )}else{
      datas.lat = null;
      datas.lng = null;
    }
  };

  reloadPage = () => {
    if(datas.lat !== null && datas.lng !== null){
      datas.city = '';
    }
    let sortPrice = datas.priceCheck.asc ? 1 : datas.priceCheck.desc ? -1 : 0;
    let sortRating = datas.ratingCheck.asc ? 1 : datas.ratingCheck.desc ? -1 : 0;
    this.props.history.push(`/search?minPrice=${datas.price.min}&maxPrice=${datas.price.max}&minRating=${datas.rating.min}&maxRating=${datas.rating.max}&minRange=${datas.range.min}&maxRange=${datas.range.max}&sortPrice=${sortPrice}&sortRating=${sortRating}&lat=${datas.lat}&lng=${datas.lng}&city=${datas.city}&rooms=${datas.rooms}`)
    window.location.reload();
  }

 
  render() {

    
    // if(datas.lat !== null && datas.lng !== null){
    //   datas.city = '';
    // }
    return (
      <div className={`${classes.self} ${this.props.classN}`}>
        <Button buttonClicked = {this.reloadPage}>
        Search
        </Button>
        <h1 className = {classes.heading}>Filter Search</h1>
       
        <SearchSuggesiton
          values={this.props.cities}
          names="city"
          ph="Search in cities"
          valueChanged={(val) => this.updateValues(val, "searchCity")}
        />
        <div className={classes.filter}>
        <h2>Rooms</h2>
       
          <SingleSlider
            mins="0"
            maxs="20000"
            names="rooms"
            factor="2000"
            precision="0"
            valueChanged={(val) => this.updateValues(val, "rooms")}
          >
            Rooms 
          </SingleSlider>
        <h2>Price Range</h2>
       
          <Slider
            mins="0"
            maxs="20000"
            names="Price"
            factor="1"
            precision="0"
            valueChanged={(val) => this.updateValues(val, "price")}
          >
            Rs
          </Slider>
          <h2>Rating Range</h2>
          <Slider
            mins="0"
            maxs="20000"
            names="Rating"
            factor="4000"
            precision="1"
            valueChanged={(val) => this.updateValues(val, "rating")}
          >
            {/* <svg className={classes.svgStar}>
              <use xlinkHref={`${sprite}#icon-star`}></use>
            </svg> */}
            Rating
          </Slider>
          <h1 className = {classes.heading}>Use My Location </h1>
          <div className={classes.searchBox}>
          <h2>Near Me</h2>
            <Toggler getValue = {this.getLocation}/>
          </div>
          <Slider
            mins="1"
            maxs="10000"
            names="Range"
            factor="100"
            precision="0"
            valueChanged={(val) => this.updateValues(val, "range")}
          >
            KM
          </Slider>
        </div>
        <h1 className = {classes.heading}>Sort Search</h1>
        <div className={classes.sorts}>
          <CheckBox
            valueChanged={(val) => this.updateValues(val, "priceCheck")}
          >
            Price
          </CheckBox>
          <CheckBox
            valueChanged={(val) => this.updateValues(val, "ratingCheck")}
          >
            Rating
          </CheckBox>
        </div>
      </div>
    );
  }
}

export default withRouter(FilterMenu);
