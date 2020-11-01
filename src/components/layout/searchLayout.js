import React from "react";
import classes from "./layout.css";
import Top from "../../containers/header/top/top";
import SearchBox from "../../components/searchBox/searchBox";
import FilterMenu from "../../containers/filterMenu/filterMenu";
import Footer from "../../containers/footer/footer";
import HotelList from "../../containers/hotelList/hotelList";
import call from "../../call";
import Loader from "../extra/loader";
import sprite from '../../assets/svg/sprite.svg';
class SearchLayout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchHotels: [],
      cities: [],
      searchQuery: {
        city: "",
        in: "",
        out: "",
        room: 0,
      },
      loader: true,
      filterShow : false
    };
    this.filterRef = React.createRef();
  }
  
  shouldComponentUpdate(nextProps , nextState){
    if(this.props.location.search !== nextProps.location.search){
      window.location.reload();

    }
    return true;
  }
  componentDidMount() {
    this.filterRef.current.onclick = (event) =>{
      let val = this.state.filterShow;
      this.setState({
          ...this.state,
          filterShow : !val
      })
  }
    const city = this.props.city;
    call("/api/v1/cities")
      .then((res) => {
        // console.log(res);

        this.setState({
          ...this.state,
          cities: res.data.result,
        });
      })
      .catch((err) => {});

    this.getResultHandler();
  }

  getResultHandler = (data) => {
    this.setState({
      ...this.state,
      loader: true,
    });
    let queryString = this.props.location.search;
    if (queryString == "") {
      queryString = `?minPrice=${0}&maxPrice=${20000}&minRating=${0}&maxRating=${5}&minRange=${0}&maxRange=${100}&sortPrice=${1}&sortRating=${-1}&lat=${null}&lng=${null}&city=&rooms=${1}`;
    }
    call
      .get("/api/v1/hotels" + queryString)
      .then((res) => {
        const data = [...res.data.result];
        this.setState({
          ...this.state,
          searchHotels: data,
          loader: false,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loader: false,
        });
      });
  };

  returnTrue = () => {
    return true;
  };
  render() {
    const styleClass = this.state.filterShow ? classes.showFilter : null;
    const block = (
      <HotelList
        hotels={[...this.state.searchHotels]}
        totalPages={Math.ceil(this.state.searchHotels.length / 5)}
      />
    );
    const dd = this.state.loader ? <Loader classN = {classes.loader}/> : block;
    return (
      <div className={classes.searchLayout}>
        <svg className = {classes.filter} ref = {this.filterRef}>
            <use xlinkHref={`${sprite}#icon-sound-mix`}></use>
        </svg>
        <Top />
       <SearchBox />
        <FilterMenu
          getHotels={this.getResultHandler}
          cities={[...this.state.cities]}
          classN = {styleClass}
        />
        {dd}
        <Footer />
      </div>
    );
  }
}

export default SearchLayout;
