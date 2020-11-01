import React from "react";
import classes from "./searchSuggestion.css";

class Search extends React.Component {
  state = {
    suggestions: [],
    value: "",
  };
  valueChanged = (event) => {
    if (event.target.value !== "") {
      let val = new RegExp("^" + event.target.value, "i");
      let cityArr = [];
      this.props.values.forEach((el, idx) => {
        if (val.test(el)) {
          cityArr.push(el);
        }
      });
      this.setState({
        suggestions: cityArr,
        value : event.target.value
      });
    } else {
      this.setState({
        suggestions: [],
        value : event.target.value
      });
    }
  };
  addToList = (value) => {
      this.setState({
          ...this.state,
          suggestions : [],
          value : value
      })
      this.props.valueChanged(value);
  };
  render() {
      const value = {
          city : this.state.value
      }
   
    let cityBlock = [];
    let cityArr = this.state.suggestions;
    for (let i = 0; i < cityArr.length; i++) {
      cityBlock.push(
        <li key={i} onClick={()=>this.addToList(cityArr[i])}>
          {cityArr[i]}
        </li>
      );
    }
    return (
      <div className={classes.self}>
        <input
          type="text"
          name={this.props.names}
          onChange={this.valueChanged}
          placeholder={this.props.ph}
          value={this.state.value}
        />
        <ul>{cityBlock}</ul>
      </div>
    );
  }
}

export default Search;
