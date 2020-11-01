import React from 'react';
import classes from './hotelList.css';
import HotelCard from '../../components/hotelCard/hotelCard';
import Button from '../../components/buttons/styleTwo';
import NoData from '../../assets/messageBox/noData';
class HotelList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pageNo : 1,
            hotelList : [],
            pages : [],
            hotels : [],
          
    }
    }
    componentDidMount(){
        this.setState({
            ...this.state,
            page : 1,
        })
       
    }

    shouldComponentUpdate(nextProp , nextState){
        if(nextProp !== this.props){
            return true;
        }if(this.state.pageNo !== nextState.pageNo){
            return true;
        }
        return false;
    }
    
    pageHandler = (event , value) => {
        // this.state.lastEl.classList.remove(classes.active);

        this.setState({
            ...this.state,
            pageNo : value,
            // lastEl : event.target
        });
        // event.target.classList.add(classes.active);
    }

    
    render(){   
        let block = this.props.hotels.length !== 0 ?
                    this.props.hotels.map((el , idx) => {
                       
                    if(idx  >= (this.state.pageNo - 1) * 5 && idx < (this.state.pageNo) * 5){
                    return (
                    <HotelCard
                        key = {idx}
                        propertyName = {el.propertyName}
                        imageUrls = {el.imageUrls}
                        location = {el.location}
                        userRating = {el.userRating}
                        amount = {el.amount}
                        discount = {el.discount}
                        roomFacilitiesArray = {el.roomFacilitiesArray}
                        hotelStarRating = {el.hotelStarRating}
                        roomFacilities = {el.roomFacilities}
                        coverImage = {el.coverImage}
                        propertyId = {el.propertyId}
                        rating = {el.rating}
                    />
                )
                }
            }) : <NoData />
      
          let pageBox = [];
          for(let i = 0; i < this.props.totalPages;i++){
              pageBox.push(<Button buttonClicked = {(event) => {this.pageHandler(event, i+1)}}>{i + 1}</Button>)
          }
        return(
            <div className = {classes.self}>
              {block}
              <div className = {classes.pages}>
              {pageBox}
              </div>
              
            </div>
            
        );
    }

}

export default HotelList;