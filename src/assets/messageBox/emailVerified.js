import React from "react";
import classes from "./messageBox.css";
import check from "../img/check.png";
import call from "../../call";
import Left from "../../components/loginItems/loginLeft";
import Button from "../../components/buttons/styleOne";
import Loader from "../../components/extra/loader";
import PageNotFound from "../../assets/messageBox/pageNotFound";
import { Link } from "react-router-dom";
class emailVerified extends React.Component {
  state = {
    loader: true,
    verified: false,
  };
  componentDidMount() {
    call({
      method: "get",
      url:
        "/validate/user/" +
        this.props.match.params.token +
        this.props.location.search,
    })
      .then((res) => {
        if (res.data.status === "success") {
          this.setState({
            loader: false,
            verified: true,
          });
        }
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loader: false,
        });
      });
  }

  render() {
    let block = this.state.loader ? (
      <Loader />
    ) : this.state.verified ? (
      <div className={`${classes.selfA}`}>
        <Left />
        <div className={classes.right}>
          <img src={check} className={classes.checked} />
          <h2>Your Email has been verified</h2>
          <Link to="/">
            <Button>Go To Homepage</Button>
          </Link>
        </div>
      </div>
    ) : (
      <PageNotFound />
    );
    return block;
  }
}

export default emailVerified;
