import React from 'react';
import classes from './cupons.css';
import {hostname} from '../../assets/constants/variables';

const Coupons = props => {
    const filterArr = props.cupons.filter((el, idx ,arr) => {
        return arr.indexOf(el) === idx;
    })
    const images = filterArr.map((el , idx) => {
        return(
            <div className = {classes.container}>
                <img src = {hostname + "/offers/" + el + ".jpg"} alt = "Offers" />
            </div>
        )
    })
    return(
        <div className = {classes.self}>
            {filterArr.length !== 0 ? images : <h2>No Offers for you</h2>}
        </div>
    )

}

export default Coupons;