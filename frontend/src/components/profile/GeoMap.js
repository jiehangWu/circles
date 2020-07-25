import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: "50ch",
  height: '50ch'
};

let lat_from_IP = 49.26;
let lng_from_IP = -123.24;

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat_IP: NaN,
      lng_IP: NaN
    };

    this.setGeolocation = this.setGeolocation.bind(this);
  }

  setGeolocation = async (position) =>{
    await this.setState({
      lat_IP: position.coords.latitude,
      lng_IP: position.coords.longitude
    });
    lat_from_IP = position.coords.latitude;
    lng_from_IP = position.coords.longitude;
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    console.log("This state lng is :", this.state.lng_IP);
    return position.coords.latitude;
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.setGeolocation)
    this.setState({
      lat_IP: lat_from_IP,
      lng_IP: lng_from_IP
    });
  }

  render() {

      return (
        <Map
          google={this.props.google}
          zoom={13}
          style={mapStyles}
          initialCenter={{
            lat: this.state.lat_IP,
            lng: this.state.lng_IP,
          }}
        />
      );
    } 
}

export default GoogleApiWrapper({
  apiKey: ''
  //   apiKey: 'AIzaSyC41Q8Y4O0EPW2q7VSYjw9Cwt6NJmU8pMQ'
})(MapContainer);