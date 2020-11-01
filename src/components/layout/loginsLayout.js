import React from "react";
import classes from "./loginsLayout.css";
import Top from "../../containers/header/top/top";
import Footer from "../../containers/footer/footer";
import ListItem from "../listItem/listItem";
import UserDetails from "../userCard/userDetails";
import BookingCard from "../bookingCard/bookingCard";
import ReviewCard from "../../components/userCard/userCard";
import ReviewBox from "../../containers/reviewBox/reviewBox";
import Button from '../../components/buttons/styleTwo';
import call from "../../call";
import AuthContext from '../../hoc/auth-context';
import PageNotFound from '../../assets/messageBox/pageNotFound';
import sprite from '../../assets/svg/sprite.svg';
import Loader from '../extra/loader';
import Spinner from '../../assets/messageBox/sideSpinner/sideSpinner';
import Coupons from '../cupons/cupons';
class LoginsLayout extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      myInfo: [],
      myBookings: [],
      myReviews: [],
      updateDetails: {
        name: "",
        email: "",
        photo: "",
      },
      updatePassword: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      renderBlock: "settings",
      bookingId: "",
      userType : 'customer',
      sideBarShow : false,
      loader : true,
      spinner : false
    };
    this.sideBarRef = React.createRef();
  }

  changeState = () => {
    let val = this.state.sideBarShow;
    this.setState({
      ...this.state,
      sideBarShow : !val
    })
  }
  componentDidMount(){
    this.getUserDetails();
  }

  getUserDetails = () => {
    call
      .get("/me", { withCredentials: true })
      .then((res) => {
        this.setState({
          ...this.setState,
          myInfo: res.data.myInfo,
          myBookings: res.data.myBookings,
          myReviews: res.data.myReviews,
          loader : false,
          userType : "customer"
        });
      })
      .catch((err) => {
        call
        .get("/owner/me", { withCredentials: true })
        .then((res) => {
          this.setState({
            ...this.setState,
            myInfo: res.data.myInfo,
            userType: "owner",
            loader : false
          });
        })
        .catch((err) => {
          this.setState({
            ...this.setState,
            loader : false
          });
        });
      });
  }

  valueChanged = (event, id) => {
    if (id === "name") {
      if (event.target.value !== "") {
        this.setState({
          ...this.state,
          updateDetails: {
            ...this.state.updateDetails,
            name: event.target.value,
          },
        });
      }
    } else if (id === "email") {
      if (event.target.value !== "") {
        this.setState({
          ...this.state,
          updateDetails: {
            ...this.state.updateDetails,
            email: event.target.value,
          },
        });
      }
    } else if (id === "photo") {
      this.setState({
        ...this.state,
        updateDetails: {
          ...this.state.updateDetails,
          photo: event.target.files[0],
        },
      });
    } else if (id === "oldPassword") {
      if (event.target.value !== "") {
        this.setState({
          ...this.state,
          updatePassword: {
            ...this.state.updatePassword,
            oldPassword: event.target.value,
          },
        });
      }
    } else if (id === "newPassword") {
      if (event.target.value !== "") {
        this.setState({
          ...this.state,
          updatePassword: {
            ...this.state.updatePassword,
            newPassword: event.target.value,
          },
        });
      }
    } else if (id === "confirmPassword") {
      if (event.target.value !== "") {
        this.setState({
          ...this.state,
          updatePassword: {
            ...this.state.updatePassword,
            confirmPassword: event.target.value,
          },
        });
      }
    }
  };

  deletePost = (event , id) =>{
    call({
      method : 'delete',
      url : '/delete-review',
      data : {
        reviewId : id
      },
      withCredentials : true
    }).then(res => {
        if(res.data.status === 'done'){
          window.location.reload();
        }
    })
  }

  submitHandler = (event, id) => {
    this.setState({
      spinner : true
    });
    const form = new FormData();
    form.append("name", this.state.updateDetails.name);
    form.append("email", this.state.updateDetails.email);
    form.append("userPhoto", this.state.updateDetails.photo);
    if (id === "details") {
      if(this.state.userType === 'customer'){
        call({
          method: "post",
          url: "/update-details",
          data: form,
          headers: {
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }).then((res) => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }else if(this.state.userType === 'owner'){
        call({
          method: "post",
          url: "/owner/update-details",
          data: {
            name : this.state.updateDetails.name,
            email : this.state.updateDetails.email
          },
          withCredentials: true,
        }).then((res) => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      }

    } else if (id === "password") {
      if (
        this.state.updatePassword.newPassword ===
        this.state.updatePassword.confirmPassword
      ) {
        if(this.state.userType === 'customer'){
          call
          .patch(
            "/update-password",
            {
              password: this.state.updatePassword.oldPassword,
              newPassword: this.state.updatePassword.newPassword,
            },
            { withCredentials: true }
          )
          .then((res) => {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch((err) => {});
        }else if(this.state.userType === 'owner'){
          call
          .patch(
            "/owner/update-password",
            {
              password: this.state.updatePassword.oldPassword,
              newPassword: this.state.updatePassword.newPassword,
            },
            { withCredentials: true }
          )
          .then((res) => {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch((err) => {});
        }
       
      } else {
        alert("Password doesnt match");
      }
    }
  };


  deleteHandler = () => {
    if(window.confirm("You want to Delete your account ?")){
      this.setState({
        loader : true
      });
    if(this.state.userType === 'customer'){
      call({
        method : 'DELETE',
        url : '/delete-user',
        withCredentials : true
      }).then(res => {
        setTimeout(()=>{
          alert("Your account is deleted");
          this.setState({
            loader :false
          })
          this.props.history.push("/");
          window.location.reload();
        } ,1000);
      }).catch(err => {
        this.setState({
          loader :false
        });
        alert("Error while deleting account , try after sometime")
      })
    }else if(this.state.userType === 'owner'){
      call({
        method : 'DELETE',
        url : '/owner/delete-owner',
        withCredentials : true
      }).then(res => {
        setTimeout(()=>{
          alert("Your account is deleted");
          this.setState({
            loader :false
          });
          this.props.history.push("/");
          window.location.reload();
        } ,1000);
      }).catch(err => {
        this.setState({
          loader :false
        });
        alert("Error while deleting account , try after sometime");

      })
    }
  }
  }

  submitReviewHandler = (values) => {
    this.setState({
      ...this.state,
      spinner : true
    })
    let overallRating =
      (parseFloat(values.satisfied) +
        parseFloat(values.valueForMoney) +
        parseFloat(values.conditions) +
        parseFloat(values.service)) /
      4;
    const reviewData = {
      text: values.suggestions,
      bookingId: this.state.bookingId,
      ratingFields: {
        satisfied: values.satisfied,
        valueForMoney: values.valueForMoney,
        conditions: values.conditions,
        service: values.service,
      },
      overallRating,
      userPhoto: this.state.myInfo.userPhoto,
      userName: this.state.myInfo.name,
    };
    call({
      method: "post",
      url: "/add-review",
      data: {
        ...reviewData,
      },
      withCredentials: true,
    }).then((res) => {
      window.location.reload();
    });
  };

  chagneBlock = (event, id, bookingId) => {

      this.setState({
        ...this.state,
        renderBlock: id,
        bookingId,
        sideBarShow : false
      });
    
  };
  cancelBooking = (id, hotelId)=>{
    this.setState({
      ...this.state,
      spinner : true
    })
    call({
      method: "DELETE",
      url : "/unbook-hotel",
      data : {
        bookingId : id,
        hotelId : hotelId
      },
      withCredentials : true
    }).then(res => {
      this.setState({
        spinner : false
      })  
      this.getUserDetails();

    }).catch(err => {
      this.setState({
        spinner : false
      })  
    })
  }
  render() {
    let renderBlock;
    if (this.state.renderBlock === "settings") {
      renderBlock = (
        <UserDetails
          values={{ ...this.state.myInfo }}
          buttonClicked={this.submitHandler}
          changed={this.valueChanged}
          userType = {this.state.userType}
          photoUploaded={(event) => {
            this.valueChanged(event, "photo");
          }}
        />
      );
    } else if (this.state.renderBlock === "booking-history") {
      renderBlock =
        this.state.myBookings.length !== 0 ? (
          this.state.myBookings.map((el, idx) => {
            return (
              <BookingCard
                values={el}
                key={idx}
                buttonClicked={(event, bookingId) =>
                  this.chagneBlock(event, "give-review", bookingId)
                }
                cancelBooking = {this.cancelBooking}
              />
            );
          })
        ) : (
          <h1>No Booking History Found</h1>
        );
    } else if (this.state.renderBlock === "give-review") {
      renderBlock = (
        <ReviewBox
          submitReview={this.submitReviewHandler}
          details={{
            hotelId: this.state.reviewHotelId,
            _id: this.state.myInfo._id,
          }}
        />
      );
    }else if(this.state.renderBlock === 'cupons'){
      renderBlock = (
        <Coupons cupons = {this.state.myInfo.cupons}/>
      )
    } else {
      renderBlock =
        this.state.myReviews.length !== 0 ? (
          this.state.myReviews.map((el, idx) => {
            return (
              <div className = {classes.myRatings}>
              <ReviewCard
                key={idx}
                values={el}
                name={el.userName}
                rating={el.overallRating}
                photo={el.userPhoto}
                text={el.text}
              />
              <Button buttonClicked = {(event) => this.deletePost(event , el._id)}>Delete Post</Button>
              </div>
            );
          })
        ) : (
          <h1>No Review History found</h1>
        );
    }
    const translateBar  = this.state.sideBarShow ? classes.translateBar : null;
    return this.state.loader ? <React.Fragment><Loader /><svg className = {classes.sideBarMenu} ref={this.sideBarRef}> 
    <use xlinkHref = {`${sprite}#icon-chevron-thin-left`}></use>
</svg></React.Fragment> : (
      <div>
      <svg className = {classes.sideBarMenu} onClick = {this.changeState}> 
          <use xlinkHref = {`${sprite}#icon-chevron-thin-left`}></use>
      </svg>
      <AuthContext.Consumer>
        {
          context => {
            return context.isLoggedIn ? (
              <div className={classes.self}>
              
        <Top />
        <div className={`${classes.sideBar} ${translateBar}`}>
          <ListItem
            itemClicked={(event) => this.chagneBlock(event, "settings", null)}
            classN={
              this.state.renderBlock === "settings" ? classes.active : null
            }
          >
            Setting
        </ListItem>
        <AuthContext.Consumer>
          {
            context => {
              return context.userType === 'customer' ? (
                <ListItem
                    itemClicked={(event) => this.chagneBlock(event, "booking-history", null)}
                    classN={
                      this.state.renderBlock === "booking-history" ? classes.active : null
                    }
                    >
                    My Bookings
                </ListItem>
              ) : (
                <ListItem
                    classN={
                      this.state.renderBlock === "booking-history" ? classes.active : null
                    }
                    >
                    <a style = {{color : "white"}} href = {this.state.myInfo.certificate} className = {classes.certificate}>Certificate</a>
                </ListItem>
              )
            }
          }
        </AuthContext.Consumer>
        <AuthContext.Consumer>
          {
            context => {
              return context.userType === 'customer' ? (
                <ListItem
                  itemClicked={(event) => this.chagneBlock(event, "reviews", null)}
                  classN={this.state.renderBlock === "reviews" ? classes.active : null}
                  >
                  My Reviews
                </ListItem>
              ) : null
            }
          }
        </AuthContext.Consumer>
        <AuthContext.Consumer>
          {
            context => {
              return context.userType === 'customer' ? (
                <ListItem
                  itemClicked={(event) => this.chagneBlock(event, "cupons", null)}
                  classN={this.state.renderBlock === "cupons" ? classes.active : null}
                  >
                  Coupons & Offers
                </ListItem>
              ) : null
            }
          }
        </AuthContext.Consumer>
        <ListItem
                    itemClicked={(event) => this.deleteHandler()}
                    >
                    Delete Account
                </ListItem>
        </div>
        
        <div className={classes.mainContent}>{renderBlock}</div>
        {this.state.spinner ? <Spinner /> : null}
        <Footer />
      </div>
            ) : <PageNotFound></PageNotFound>

          }
        }
      </AuthContext.Consumer>

      </div>
    );
  }
}

export default LoginsLayout;
