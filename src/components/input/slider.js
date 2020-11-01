import React from "react";
import classes from "./input.css";

let leftStyle = null;
let rightStyle = null;
let rightSliderStyle = null;
let leftSliderStyle = null;
class Slider extends React.Component {
    state = {
        leftValue : 0,
        rightValue : (this.props.maxs - this.props.mins),
        left : 0,
        right : 100
    }

  rangeChagneHandlerLeft = (event) => {
    // console.log("value " + event.target.value);
    // console.log(this.state.leftValue , this.state.rightValue);
    
    let value = Math.min(parseInt(event.target.value), parseInt(this.state.rightValue-((this.props.maxs - this.props.mins)/4)));
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
  rangeChagneHandlerRight = (event) => {
    let value = Math.min(parseInt(this.props.maxs - event.target.value) , parseInt(this.props.maxs - this.state.leftValue) - ((this.props.maxs - this.props.mins)/4)); 
    let pct = ((value - this.props.mins)/(event.target.max - event.target.min)) * 100 ;
    this.setState({
        ...this.state,
        rightValue : this.props.maxs - value,
        right : pct
    });
    const temp = parseInt((event.target.value/event.target.max) * 100);
    rightStyle = {
        right: pct + "%"
    }
    rightSliderStyle = {
      width : pct + "%"
    }
   
  };


  render() { 
    const minValue = (this.state.leftValue / this.props.factor).toFixed(this.props.precision);
    const maxValue = (this.state.rightValue / this.props.factor).toFixed(this.props.precision)
    this.props.valueChanged({minValue, maxValue});
    return (
        <div className={classes.rangeBox}>
          <input
            type="range"
            min={this.props.mins}
            max={this.props.maxs}
            value = {this.state.leftValue}
            name={"min" +this.props.names}
            onChange={this.rangeChagneHandlerLeft}
            className = {classes.leftInput}
          />
          <input
            type="range"
            min={this.props.mins}
            max={this.props.maxs}
            value = {this.state.rightValue}
            name={"max" +this.props.names}
            onChange={this.rangeChagneHandlerRight}
            className = {classes.rightInput}
          />
          <div className={classes.slider}></div>
          <div style = {leftSliderStyle} className={classes.leftSlider}></div>
          <div style = {rightSliderStyle} className={classes.rightSlider}></div>
          <div style = {leftStyle} className={classes.leftThumb}></div>
          <div style = {rightStyle} className={classes.rightThumb}></div>
          <div style = {leftStyle} className={classes.leftValBox}><p>{this.props.children} {(this.state.leftValue / this.props.factor).toFixed(this.props.precision)}</p></div>
          <div style = {rightStyle} className={classes.rightValBox}><p>{this.props.children} {(this.state.rightValue / this.props.factor).toFixed(this.props.precision)}</p></div>
        </div>
    );
  }
}

export default Slider;
