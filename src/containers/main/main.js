import React from "react";
import classes from "./main.css";
import call from '../../call';
import {hostname} from '../../assets/constants/variables';
class Main extends React.Component {
  state = {
    offers : []
  }
  componentDidMount(){
    call.get('/offer')
    .then(response =>{
        const data = response.data.offers;
        this.setState({
          ...this.state,
          offers: data
        })
    }).catch(err=>{
     
    });
  }
  render() {
    const offerBlock = this.state.offers.map((el,idx) => {
      return (<img src = {"https://immense-hollows-05754.herokuapp.com" + el} key = {idx} />)
    })
    return (
      <div className={classes.self}>
        <h1 className={classes.hOne}>Grab Amazing Deals and Offer</h1>
        <div className={classes.searchContent}>
        </div>
        <div className={classes.offerContent}>
          {offerBlock}
        </div>
      </div>
    );
  }
}

export default Main;
