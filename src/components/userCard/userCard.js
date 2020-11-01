import React from 'react';
import classes from './userCard.css'
import sprite from '../../assets/svg/sprite.svg';
import {hostname} from '../../assets/constants/variables';
const userCard = props => {
    
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
    return(
        <div className = {classes.self}>
            <div className = {classes.userPhoto}>
                <img src = {props.photo}></img>
                
            </div>
            <h2>{props.name + "\t\t" } </h2>
            <h2>{ calStar(props.rating)}</h2>
            <div className = {classes.details}>
                <p>{props.text}</p>
            </div>
        </div>
    )
}
export default userCard;