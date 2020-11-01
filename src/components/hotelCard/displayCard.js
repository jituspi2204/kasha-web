import React from 'react';
import classes from './hotelCard.css';
import Button from '../buttons/styleOne';
import sprite from '../../assets/svg/sprite.svg';
import {withRouter} from 'react-router-dom';
const DisplayCard = props => {
    const calStar = (value) => {
        let rating = props.rating;
        let starClass;
        let deafultClass = {
            fill : 'rgb(151, 151, 151)'
        };
        if(rating < 1 && rating >=0){
            starClass = {
                fill : 'rgb(255, 1, 1)'
            }
        }else if (rating < 2 && rating >=1){
            starClass = {
                fill : 'rgb(255, 81, 1)'
            }
        }else if (rating < 3 && rating >=2){
            starClass = {
                fill : 'rgb(245, 221, 0)'
            }
        }else if (rating < 4 && rating >=3){
            starClass = {
                fill : 'rgb(171, 245, 0)'
            }
        }else{
            starClass = {
                fill : 'rgb(0, 161,27)'
            }
        }
        let stars = [];
        for(let i = 1; i <= 5; i++){
            if(value >= i){
                stars.push( <svg style = {starClass}>
                    <use xlinkHref = {`${sprite}#icon-star`}></use>
                </svg>)
            }else{
                stars.push(<svg style = {deafultClass}>
                    <use xlinkHref = {`${sprite}#icon-star`}></use>
                </svg>)
            }
        }
        return stars;
    }
    const buttonClicked = (id) => {
        if(id){
        props.history.push("/search/" + id)
        // setTimeout(() => {
        //     window.location.reload();
        // },100);
        }else{
            props.history.push(`/search?minPrice=${0}&maxPrice=${20000}&minRating=${0}&maxRating=${5}&minRange=${0}&maxRange=${100}&sortPrice=${1}&sortRating=${-1}&lat=${null}&lng=${null}&city=${props.cityName}&rooms=${1}`)
        }
    }
    return(
        <div className = {classes.displayCard} key = {Date.now()/1000}> 
            <div className = {classes.displayImage}>
              <img src = {props.image || "https://immense-hollows-05754.herokuapp.com/bg/delhi.jpg"} />
            </div>
            <div className = {classes.cityName}>
                <h2>{props.cityName}</h2>
            </div>
            <div className = {classes.priceRange}>
                 {calStar(props.rating)}
                <h2>Rs {props.priceRange}</h2>
            </div>
           <Button buttonClicked = {()=>buttonClicked(props.propertyId)}>Explore Now</Button>
           
        </div>
    )
};
export default withRouter(DisplayCard);