import React from "react";
import classes from "./input.css";

let leftStyle = null;
let leftSliderStyle = null;
class SingleSlider extends React.Component {
    state = {
        leftValue : (this.props.maxs - this.props.mins)*0.05,
        left : 5,
    }

  rangeChagneHandlerLeft = (event) => {
    let value =parseInt(event.target.value);
    let pct = ((value - event.target.min)/(event.target.max - event.target.min)) * 100;    
    this.setState({
        ...this.state,
        leftValue : value,
        left : pct
    });
  
    leftStyle = {
        left: pct + "%"
    }
    leftSliderStyle = {
      width : pct + "%"
    }

  };
 

  render() { 
    const minValue = (this.state.leftValue / this.props.factor).toFixed(this.props.precision);
    const maxValue = (this.state.rightValue / this.props.factor).toFixed(this.props.precision)
    this.props.valueChanged({minValue});
    return (
        <div className={classes.rangeBox}>
          <input
            type="range"
            min={this.props.mins}
            max={this.props.maxs}
            value = {(this.state.left/100)*(this.props.maxs - this.props.mins)}
            name={"min" +this.props.names}
            onChange={this.rangeChagneHandlerLeft}
            className = {classes.leftInput}
          />
          <div className={classes.slider}></div>
          <div style = {leftSliderStyle} className={classes.slider}></div>
          <div style = {leftStyle} className={classes.leftThumb}></div>
          <div style = {leftStyle} className={classes.leftValBox}><p>{this.props.children} {(this.state.leftValue / this.props.factor).toFixed(this.props.precision)}</p></div>
          
        </div>
    );
  }
}

export default SingleSlider;
