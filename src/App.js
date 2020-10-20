import React from "react";
import classes from "./App.css";
import Body from '../src/containers/body/body';
import {BrowserRouter} from 'react-router-dom';
import Loader from './components/extra/loader';
class App extends React.Component {
  state = {
    loader : true
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({
        loader : false
      })
    },1000)
   
  }
  render() {
    let block = this.state.loader ? <Loader /> : (
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
    return block;
  }
}

export default App;
