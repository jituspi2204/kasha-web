import React from "react";
import classes from "./extraMain.css";
import call from '../../call';
import Map from '../map/map';
class Right extends React.Component {

  state = {
    locations : [],
    currentLoc : {
      lat : 20.5937,
      long :78.9629,
      range : 2000,
      scale : 3
    }
  }

  componentDidMount(){
      call.post('/api/v1/locations',this.state.currentLoc)
      .then(res =>{
         const data = res.data.locations;
          this.setState({
            ...this.state,
            locations : data
          });  
            
      })
  }

  render() {
    let currentLoc = this.state.currentLoc;
    return <div className={classes.self}>
    <h1>
      Hotels and Resort Across India
    </h1>
          <Map locations = {this.state.locations} currentLoc = {currentLoc}/>
    </div>;
  }
}

export default Right;
