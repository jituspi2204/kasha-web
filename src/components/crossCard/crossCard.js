import React from 'react';
import classes from './crossCard.css';
import sprite from '../../assets/svg/sprite.svg';
import ReviewCard from '../userCard/userCard';
class CrossCard extends React.Component {

    state = {
        reviewList : []
    }

    componentDidMount(){
        this.setState({
            ...this.state, 
             reviewList : this.props.reviewList
        })
    }
    render(){
        const reviewBlock = this.state.reviewList.map((el , idx) => {
            return(
                <div key = {idx} className={classes.reviewBox}>
                    <ReviewCard rating = {el.overallRating} photo = {el.userPhoto} text = {el.text} name = {el.userName}/>
                </div>
            )
        })
        return(
            <div className = {classes.backgroundBox}>
            <div className = {classes.self}>
                <div className = {classes.crossIcon}>
                    <svg>
                        <use xlinkHref = {`${sprite}#icon-plus`} onClick = {this.props.close}></use>
                    </svg>
                </div>

                <div className = {classes.container}>
                    {reviewBlock}
                </div>
            </div>
            </div>
        )
    }


}

export default CrossCard;