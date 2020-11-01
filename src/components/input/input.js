import React from "react";
import classes from "./input.css";

const input = (props) => {

  return (
    <input
      type={props.types}
      name={props.names}
      className={classes.self}
      placeholder={props.ph}
      value = {props.val}
      onChange = {props.changed}
      autoComplete = {props.autoComplete ? "off" : "on"}
      min = {props.mins}
      max = {props.maxs}
      onKeyPress = {props.keyPressed}
      onInput = {props.selected}
    />
  );
};

export default input;
