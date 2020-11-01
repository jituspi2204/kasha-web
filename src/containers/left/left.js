import React from 'react';
import classes from './left.css';
import ListItem from '../../components/listItem/listItem';
import call from '../../call';
import sprite from '../../assets/svg/sprite.svg';
import {Link} from 'react-router-dom';
import HotelCard from '../../components/hotelCard/displayCard';
class Left extends React.Component{

    state = {
        stateList : [],
        topHotels : []
    }   
    

    componentDidMount(){
        call.get('/states')
        .then((res) => {
            this.setState({
                ...this.state,
                stateList :  res.data.states
            });
        }).catch(err => {
        }); 

    let queryString = `?minPrice=${0}&maxPrice=${20000}&minRating=${0}&maxRating=${5}&minRange=${0}&maxRange=${100}&sortPrice=${1}&sortRating=${-1}&lat=${null}&lng=${null}&city=`;
    call
      .get("/api/v1/hotels" + queryString)
      .then((res) => {
        const data = [...res.data.result];
        this.setState({
          ...this.state,
          topHotels : data
        });
      })
      .catch((err) => {
       
      });
    }

    render(){
        const list = this.state.stateList.map((el,idx) => {
            return (
                <ListItem key = {idx}> 
                <Link to = {{
                    pathname : "/search",
                    search : `minPrice=${0}&maxPrice=${100000}&minRating=${0}&maxRating=${5}&minRange=${0}
                    &maxRange=${100000}&sortPrice=${1}&sortRating=${-1}&lat=${null}&lng=${null}&state=${el}&rooms=1`
                }}>
                    {el}
                    </Link>
                    <svg>
                        <use xlinkHref = {`${sprite}#icon-direction`}></use>
                    </svg>
                </ListItem>
               
            );
        })

        // const block = <AuthContext.Consumer>
        //   {(context)=>{
        //       return !context.isLoggedIn ?   : <UserMenu />
        //   }}
        // </AuthContext.Consumer>

        return(
            <div className = {classes.self}>
                
                <ul className = {classes.areaList}>
                <h2 className = {classes.hTwo}>
                    Find Hotels Across India
                </h2>
                    {list}
                </ul>
                <div className = {classes.cityCards}>
                    <h2 className = {classes.hTwo}>
                        You can find
                    </h2>
                    
                </div>
            </div>
        );
    }

}

export default Left;