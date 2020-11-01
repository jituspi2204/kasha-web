import React from "react";
import Header from "../../containers/header/header";
import Main from "../../containers/main/main";
import Footer from "../../containers/footer/footer";
import Left from "../../containers/left/left";
import ExtraMain from "../../containers/extraMain/extraMain";
import classes from "./layout.css";
class userLayout extends React.Component {
  componentDidMount(){
    window.prevLocation = this.props.location.pathname;
  }
  render() {
    return (
      <div className={classes.userLayout}>
          <Header />
          <Main />
          <ExtraMain />
          <Footer />
      </div>
    );
  }
}

export default userLayout;
