import React from "react";
import classes from "./reviewBox.css";
import Button from "../../components/buttons/styleOne";
import Input from "../../components/input/input";
class ReviewBox extends React.Component {
  state = {
    value: {
      suggestions: "",
      valueForMoney: 0,
      service: 0,
      conditions: 0,
      satisfied: 0,
    },
  };

  valueChanged = (event, id) => {
    let value = event.target.value;
    if (value <= 5 && value > 0) {
      if (id === "vfm") {
        this.setState({
         
          value : {
            ...this.state.value,
              valueForMoney: value,
          }
        });
      } else if (id === "conditions") {
        this.setState({
          value : {...this.state.value,
          conditions: value,
          }
        });
      } else if (id === "service") {
        this.setState({
          value : {
            ...this.state.value,
          service: value,
          }
        });
      } else {
        this.setState({
          value : {
            ...this.state.value,
          satisfied: value,
          }
        });
      }
    } else {
        alert('Value should be in range 0 to 5');
        
    }
  };
  textChanged = (event) => {
      this.setState({
          value : {
            ...this.state.value,  
            suggestions : event.target.value}
      })
  }

  render() {
    return (
      <div className={classes.self}>
        <h1>Review Section</h1>
        <h2>Suggestions</h2>
        <textarea onChange = {this.textChanged}></textarea>
        <h2>Value for Money</h2>
        <Input
          types="number"
          mins="1"
          maxs="5"
          changed={(event) => this.valueChanged(event, "vfm")}
        />
        <h2>Service</h2>
        <Input
          types="number"
          mins="1"
          maxs="5"
          changed={(event) => this.valueChanged(event, "service")}
        />
        <h2>Condition</h2>
        <Input
          types="number"
          mins="1"
          maxs="5"
          changed={(event) => this.valueChanged(event, "conditions")}
        />
        <h2>Satisfied</h2>
        <Input
          types="number"
          mins="1"
          maxs="5"
          changed={(event) => this.valueChanged(event, "satisfied")}
        />
        <Button buttonClicked = {() => this.props.submitReview(this.state.value)}>Submit</Button>
      </div>
    );
  }
}

export default ReviewBox;
