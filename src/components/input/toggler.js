import React from 'react';
import classes from './input.css';

class Toggler extends React.Component{
    state = {
        on : false
    }

    rightClicked=()=>{
      this.setState({
          on : true
      })
      this.props.getValue(true);
      
    }


    leftClicked=()=>{
        this.setState({
            on : false
        })
        this.props.getValue(false);
    }
        
    render(){
       
        const styles = this.state.on ? {
            background : 'rgb(0, 132, 255)'
        } : null;
         
        return (
            <div className = {classes.switch} style={styles}>
            <input type = "radio" name = "location" className={classes.left} onClick={this.leftClicked}/>
            <input type = "radio" name = "location" className={classes.right}  onClick={this.rightClicked}/>
            <div className = {classes.switchButton}></div>
            </div>
        )
    }

}
export default Toggler;