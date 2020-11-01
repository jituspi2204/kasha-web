import React from 'react';
import classes from './reviewBox.css';
import sprite from '../../assets/svg/sprite.svg';
let values = [10,10,10,10,10];
let factor = 100;
const hotelReviewBox = props => {
    values = props.value.map((el,idx) => {
        if(props.total === 0){
            return 0;
        }
        return parseInt((el/props.total)*factor);
    })

    let styleOne = {
        width : values[0] + '%',
        background : 'rgb(255, 1, 1)'
    } 
    let styleTwo = {
        width : values[1] + "%",
        background : 'rgb(255, 81, 1)'
    }
    let styleThree = {
        width : values[2]+"%",
        background : 'rgb(245, 221, 0)'
    }
    let styleFour = {
        width : values[3]+'%',
        background : 'rgb(171, 245, 0)'
    }
    let styleFive = {
        width : values[4] + "%",
        background : 'rgb(0, 161, 27)'
    }

    let starClass ;
    const coutStars = (rating) => {
       
        if(rating < 1 && rating >=0){
            starClass = {
                color : 'rgb(255, 1, 1)',
                fill : 'rgb(255, 1, 1)'
            }
        }else if (rating < 2 && rating >=1){
            starClass = {
                color : 'rgb(255, 81, 1)',
                fill : 'rgb(255, 81, 1)'
            }
        }else if (rating < 3 && rating >=2){
            starClass = {
                color : 'rgb(245, 221, 0)',
                fill : 'rgb(245, 221, 0)'
            }
        }else if (rating < 4 && rating >=3){
            starClass = {
                color : 'rgb(171, 245, 0)',
                fill : 'rgb(171, 245, 0)'
            }
        }else{
            starClass = {
                color : 'rgb(0, 161, 27)',
                fill : 'rgb(0, 161,27)'
            }
        }
        let stars = [];
        for(let i= 1; i <=5;i++){
            if(rating  >= i){
                stars.push(<svg>
                    <use xlinkHref = {`${sprite}#icon-star`} style = {starClass}></use>
                </svg>)
            }
        }
        return stars
    }
    let starArr = coutStars(props.rating);
    return(
        <div className = {classes.hotelReviewBox}>
            <h1>Hotel Rating</h1>
            <div className= {classes.content}>
                <h1 style = {starClass} >{props.rating}</h1>
                {starArr}
                <br/><br/>
                <svg>
                    <use xlinkHref = {`${sprite}#icon-user`}></use>
                </svg>
                <h2>{props.total} Users Rated </h2>
            </div>
            <div className = {classes.ratingBox}>
                <div  className = {classes.bars}>
                    <svg>
                        <use xlinkHref = {`${sprite}#icon-star`}></use>
                    </svg><h2>5</h2><h3>{(values[4])}%</h3>
                    <div className  = {classes.backBar} style = {styleFive}></div>
                </div>
                <div  className = {classes.bars}><svg>
                        <use xlinkHref = {`${sprite}#icon-star`}></use>
                    </svg><h2>4</h2><h3>{(values[3]) }%</h3>
                    <div className  = {classes.backBar} style = {styleFour}></div>
                </div>
                <div  className = {classes.bars}><svg>
                        <use xlinkHref = {`${sprite}#icon-star`}></use>
                    </svg><h2>3</h2><h3>{(values[2])}%</h3>
                    <div className  = {classes.backBar} style = {styleThree}></div>
                </div>
                <div  className = {classes.bars}><svg>
                        <use xlinkHref = {`${sprite}#icon-star`}></use>
                    </svg><h2>2</h2><h3>{(values[1])}%</h3>
                    <div className  = {classes.backBar} style = {styleTwo}></div>
                </div>
                <div  className = {classes.bars}><svg>
                        <use xlinkHref = {`${sprite}#icon-star`}></use>
                    </svg><h2>1</h2><h3>{(values[0])}%</h3>
                    <div className  = {classes.backBar} style = {styleOne}></div>
                </div>
            </div>
        </div>
    );

}

export default hotelReviewBox;