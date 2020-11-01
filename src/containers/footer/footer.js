import React from 'react';
import classes from './footer.css';
import Logo from '../../containers/header/logo/logo';
import sprite from '../../assets/svg/sprite.svg';
import Button from '../../components/buttons/styleTwo';
const footer = props => {
    return (
        <footer className= {classes.self} id="footer">
         <div className = {classes.middle}>
                <Logo />
                <div className = {classes.icons}>
                    <svg className = {classes.socialMediaIcon}>
                        <use xlinkHref = {`${sprite}#icon-instagram`}></use>
                    </svg>
                    <svg className = {classes.socialMediaIcon}>
                        <use xlinkHref = {`${sprite}#icon-facebook`}></use>
                    </svg>
                    <svg className = {classes.socialMediaIcon}>
                        <use xlinkHref = {`${sprite}#icon-twitter`}></use>
                    </svg>
                </div>
            </div>
            <div className = {classes.address}>
                <li>Delhi</li>
                <li>Mumbai</li>
                <li>Kolkata</li>
                <li>Agra</li>
                <li>Cheenai</li>
                <li>Pune</li>
            </div>
            <div className = {classes.left}>
                <h1>KASHA.com</h1>
                 <h2>India's Largest Hotel Branch having more than 10000+ suscribers.</h2>
                 <h3>Book Your Hotel Today</h3>
                 <div className = {classes.developer}>
                     Made By - Ravi and Jitendra
                 </div>
            </div>
           
            <div className = {classes.right}>
                <h2>Provide your Feedback to improve our services</h2>
                <textarea className = {classes.textArea}></textarea>
                <Button>Submit</Button>
                <h2>Email  <br /> jitu983sharma1999@gmail.com</h2>
                <h2>Phone No <br /> +91-XXXXX679890</h2>
            </div>
            
            
        </footer>
    );
}


export default footer;