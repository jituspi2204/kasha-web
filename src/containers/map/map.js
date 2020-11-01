import React from "react";
import classes from "./map.css";
import Icon from "../../components/extra/marker";
import MapGL, { Marker,Popup} from "react-map-gl";

const accessToken =
  "pk.eyJ1Ijoiaml0dTk4M3NoYXJtYTE5OTkiLCJhIjoiY2ticnF4bGEyMnlndTJ6cXZoeXN5cjdtMyJ9.RAGsSO4jRPQprYXX5FLWyA";
class Map extends React.Component {
  state = {
    viewport: {
      latitude: this.props.currentLoc.lat,
      longitude: this.props.currentLoc.long,
      zoom: this.props.currentLoc.scale || 10,
      width: "100%",
      height: "100%",
    },
  };
  render() {
    const { viewport } = { ...this.state };
    return (
      <div className={classes.self}>
        <MapGL
           scrollZoom = {true}
          mapboxApiAccessToken={accessToken}
          {...viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
          mapStyle="mapbox://styles/jitu983sharma1999/ckbrrk3tv1diy1imz305xxhv9"
        >
        {this.props.locations.map(el => {
          return (<Marker key = {el.location[0] * el.location[1]} longitude = {el.location[0]} latitude = {el.location[1]}>
            <Icon></Icon>
          </Marker>)
        })}
        {this.props.locations.map(el => {
          return (<Popup key = {el.location[0] * el.location[1]} longitude = {el.location[0]} latitude = {el.location[1]}>
            <p>{el.propertyName}</p>
          </Popup>)
        })}
        </MapGL>
      </div>
    );
  }
}
export default Map;
