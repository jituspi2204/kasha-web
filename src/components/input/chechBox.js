import React from "react";
import classes from "./input.css";

class CheckBox extends React.Component {

    state = {
        ascPrice: false,
        descPrice: false,
      };
    boxCheckedHandler = (event, id) => {
        if(id === 'asc'){
          if(!this.state.ascPrice){
                if(this.state.descPrice){
                  this.setState({
                    ...this.state,
                    descPrice : false,
                    ascPrice : true
                })
            }else{
              this.setState({
                ...this.state,
                ascPrice : true
              })
            }
          }else{
            this.setState({
              ...this.state,
              ascPrice : false
            })
          }
    
        }else{
          if(!this.state.descPrice){
            if(this.state.ascPrice){
              this.setState({
                ...this.state,
                descPrice : true,
                ascPrice : false
              })
            }else{
              this.setState({
                ...this.state,
                descPrice : true,
              })
            }
          }else{
            this.setState({
              ...this.state,
              descPrice : false,
            })
        }
      }
    }

  render() {

    const asc = this.state.ascPrice;
    const desc = this.state.descPrice
    this.props.valueChanged({asc , desc})

    return (
        <div className={classes.checkBoxes}>
        <h2>{this.props.children}</h2>
        <label for={"asc" + this.props.children} >Low to High</label>
        <input
          type="checkbox"
          name={"asc" + this.props.children} 
          checked = {this.state.ascPrice}
          onClick={(event) => this.boxCheckedHandler(event, "asc")}
        />
        <label for={"descPrice" + this.props.children} >High to Low</label>
        <input type="checkbox" name={"desc" + this.props.children} 
          checked = {this.state.descPrice}
          onClick={(event) => this.boxCheckedHandler(event, "desc")}
        />
      </div>
    );
  }
}

export default CheckBox;
