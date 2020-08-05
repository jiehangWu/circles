import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {connect} from 'react-redux';
import {userActions} from "../../actions/user.actions";

const mapStyles = {
    width: "50ch",
    height: '50ch'
};

let initialLat = 49.26;
let initialLng = -123;

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: initialLat,
            lng: initialLng,
            infoDisplay: false,
            activeMarker: {},
            selectedPlace: {},
        };
        this.getGeolocation = this.getGeolocation.bind(this);
    }

    getGeolocation = async () => {
        await this.props.loadGeolocation(this.props.id);
    };

    componentWillMount() {
        this.getGeolocation(this.props.id);
        if (this.props.geolocation) {
            this.setState({
                lat: this.props.geolocation[0],
                lng: this.props.geolocation[1],
            });
        }
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            })
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.props.geolocation ?
                    <Map
                        google={this.props.google}
                        zoom={13}
                        style={mapStyles}
                        center={{
                            lat: this.props.geolocation[0],
                            lng: this.props.geolocation[1],
                        }}
                        onClick={this.onMapClicked}
                    >

                        <Marker onClick={this.onMarkerClick}
                                name={'descripton1'}
                                position={{lat: this.props.geolocation[0], lng: this.props.geolocation[1]}}
                        />

                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            content={this.props.name}>
                        </InfoWindow>

                    </Map> : ''}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        geolocation: state.userinfo.geolocation,
    };
};

const mapAction = {
    loadGeolocation: userActions.loadGeolocation,
};

export default GoogleApiWrapper({
    apiKey: process.env.GOOGLEMAPAPIKEY
})(connect(mapStateToProps, mapAction,)(MapContainer));