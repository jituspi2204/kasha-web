import React from "react";
import classes from "./hotelCard.css";
import sprite from "../../assets/svg/sprite.svg";
import Button from "../buttons/styleOne";
import {Link} from 'react-router-dom';
const hotelCard = (props) => {
  if(!props.location){
    return <div></div>
  }
  const avgRating = props.rating;
  let ratingClass;
  if (avgRating > 4) {
    ratingClass = {
      backgroundColor: "rgb(43, 184, 85)",
    };
  } else if (avgRating > 3) {
    ratingClass = {
      backgroundColor: "rgb(255, 217, 0)",
    };
  } else if (avgRating > 2) {
    ratingClass = {
      backgroundColor: "rgb(255, 115, 0)",
    };
  } else if(avgRating > 0){
    ratingClass = {
      backgroundColor: "rgb(255, 0, 0)",
    };
  }else{
    ratingClass = {
      backgroundColor: "rgb(190, 190, 190)",
    };
  }
let images = props.coverImage;
  const area =
    props.location.address +
    " , " +
    props.location.area +
    " ," +
    props.location.city +
    " , " +
    props.location.state +
    " , " +
    props.location.country;
  return (
    <div className={classes.self}>
      
      <div className = {classes.coverPhoto}>
        {images[0] ? <img src={images[0]} /> : <p>Not available</p>}
      </div>
      {/* <div className={classes.mapClass}><Map /></div> */}
      <div className={classes.photoOne}>
        {images[1] ? <img src={images[1]} /> : <p>Not available</p>}
      </div>
      <div className={classes.photoTwo}>
        {images[2] ? <img src={images[2]} /> : <p>Not available</p>}
      </div>
      <div className={classes.photoThree}>
        {images[3] ? <img src={images[3]} /> : <p>Not available</p>}
      </div>
      <div className={classes.photoFour}>
        {images[4] ? <img src={images[4]} /> : <p>Not available</p>}
      </div>
      <div className={classes.photoFive}>
        {images[5] ? <img src={images[5]} /> : <p>Not available</p>}
      </div>

      <div className={classes.details}>
        <div className={classes.propertyName}>
          <h1>{props.propertyName}</h1>
          <h2>{area}</h2>
        </div>

        <div className={classes.assets}>
          <div className={classes.rating}>
            <h2  style={ratingClass} >
              {avgRating}
              <svg>
                <use xlinkHref={`${sprite}#icon-star`}></use>
              </svg>
            </h2>
            <h1>{props.hotelStarRating}</h1>
          </div>
        </div>
        <div className={classes.service}>
       
            {props.roomFacilities.split('|').map((el , idx) => {
              return(
                <li key = {idx}>{el}</li>
              )
            })}
        </div>
        <div className={classes.price}>
          <h1 className={classes.amount}>Rs {props.amount - props.discount}</h1>
          <h1 className={classes.realAmount}>
            <strike>Rs {props.amount}</strike>
          </h1>
          <h2 className={classes.discount}>Of {((props.discount /props.amount ) * 100).toFixed(1)}%</h2>
        </div>
      </div>
      <div className={classes.buttons}>
        <div className={classes.check}>
        <Link to = {`/search/${props.propertyId}`} >
          <Button>Check</Button>
        </Link>
        </div>
        <div className={classes.book}>
        <div className={classes.tag}>
        <svg>
          <use xlinkHref={`${sprite}#icon-thumbs-up`}></use>
        </svg>
      </div>
        </div>
      </div>
    </div>
  );
};

export default hotelCard;
