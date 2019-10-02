import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
//import {MapboxDirections} from '@mapbox/mapbox-gl-directions';
//import Tooltip from './components/tooltip';
import mapMarkerIcon from './marker-icon.svg';
//var mapboxgl = require('mapbox-gl');
//var MapboxDirections = require('@mapbox/mapbox-gl-directions');
//import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' utils/compose

//import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
//import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
//import './hotelMarkerMap.css';

import { Button, Card, CardBody, CardGroup, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';


import { connect } from 'react-redux';
import { tilesLoaded, tilesError, tilesRequested } from '../../../../weather/actions';
import compose from '../../../../../utils/compose';
import withWeatherService from '../../../../weather/components/hoc';
import './hotelDashboard.css';
//const ErrorIndicator = React.lazy(() => import('../../../errorIndicator'));
const CentrPageSpinner = React.lazy(() => import('../../../../CentrPageSpinner'));


//mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ID;


class HotelDashboard extends Component {
    map;
    markerRef;

    state = {
        lng: -79.38,
        lat: 43.65,
        zoom: 7.5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMi0QnVvJROe-0oXg0a29J9mJLk2c9JMnuC3F893xeKMa2R_ou",
        name: 'Hotel Name',
        email: '',
        password: '',
        errors: {
        },
        done: false,
        isLoading: false,
        cityType: "",
        cityName: "",
        marker: null,
        popup: null,
        currentCityName: "",
        statusText: ""
    };

    markerContainer;

    componentDidMount() {
        const { lng, lat, zoom } = this.state;

        this.markerContainer = document.createElement('div');

        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom
        });

        this.map.on('load', () => {
            this.map.resize();
        });

        this.markerRef = ReactDOM.render(
            <div className='hotel-dashboard-mapboxgl-marker'>
                <img alt="marker" src={mapMarkerIcon} />
            </div>, this.markerContainer);

        this.map.on('mousedown', (e) => {

            if (e.originalEvent.which === 3) {
                this.setState({
                    lng: e.lngLat.lng,
                    lat: e.lngLat.lat
                })

                this.createMarker();
            }
        });

        this.map.on('mousemove', (e) => {
            const features = this.map.queryRenderedFeatures(e.point);
            const { lng, lat } = e.lngLat;

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: this.map.getZoom().toFixed(2),
                cityType: "",
                cityName: ""
            });

            if (typeof features[0] !== typeof undefined) {
                //let cityName = features[0].properties.name_en;
                let placeType = features[0].properties.type;


                if (placeType === "city" || placeType === "town" || placeType === "village") {
                    this.map.getCanvas().style.cursor = 'crosshair';
                    placeType += " ";

                    this.setState({
                        cityType: placeType,
                        cityName: features[0].properties.name_en
                    });
                }
                else {
                    this.map.getCanvas().style.cursor = 'grab';
                    placeType = "";

                }

            }
        });

        this.map.addControl(new mapboxgl.NavigationControl());
        this.map.resize();
    }


    createMarker() {
        const { marker, popup } = this.state;
        const { image, name } = this.state;

        const coordX = this.state.lng;
        const coordY = this.state.lat;
        //console.log("coordY", coordX, coordY);       

        const descript =
            '<div>' +
            '<h2 style="text-align: center">' + name + '</h2>' +
            '<img class="hotel-dashboard-image" alt="marker" + src="' + image + '"/>'
            + '</div>';
        if (popup) popup.remove();

        const newpopup = new mapboxgl.Popup({ offset: [0, -5] })
            .setLngLat([coordX, coordY])
            .setHTML(
                descript
            )
            .addTo(this.map);


        if (marker) marker.remove();
        const newmarker = new mapboxgl.Marker(this.markerRef, {
            draggable: false,
        })
            .setLngLat([coordX, coordY])
            .setPopup(popup)
            .addTo(this.map);

        newmarker.togglePopup();

        this.setState({
            popup: newpopup,
            marker: newmarker
        })

    }

    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    [name]: value,
                    errors
                }
            )
        }
        else {
            this.setState(
                { [name]: value })
        }
    };


    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        console.log('submit');
    };


    _updateCity = (e) => {
        if (e) {
            e.preventDefault();
        }

        const city = this.state.currentCityName;
        this.setState({
            currentCityName: ""
        });
        //console.log("city", city);
        if (city.length !== 0) {
            //this.props.fetchTiles(city);
            // console.log("this.props_updateCity", this.props);

            const { dispatch, weatherService } = this.props;
            dispatch(tilesRequested());
            weatherService.getTiles(city)
                .then((tiles) => {
                    dispatch(tilesLoaded(tiles))

                    // console.log("tiles", tiles.cityCoord);
                    const { lat, lon } = tiles.cityCoord;

                    this.setState({
                        lat: lat,
                        lng: lon,
                        cityName: city,
                        statusText: ""
                    });

                    this.map.flyTo({
                        center: [lon, lat]
                    });

                    // this.map.resize();
                    this.createMarker();

                })
                .catch((err) => {
                    dispatch(tilesError(err))
                    this.setState({ statusText: "Invalid name of city!" })
                }
                )
        }
    }

    _onkeyPress = e => {
        //console.log("e", e.key);
        return e.key === "Enter" ? this._updateCity() : null
    }


    render() {
        if (this.map) {
            this.map.resize();
        }

        const { lng, lat, cityType, cityName, currentCityName } = this.state;
        const { tilesError } = this.props;

        const form1 = (

            <Form onSubmit={this._updateCity}>
                {/* <h1>Login</h1>
                              <p className="text-muted">Sign In to your account</p> */}
                {/* {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''} */}

                <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        placeholder="currentCityName"
                        autoComplete="current-currentCityName"
                        // className={classnames('form-control', { 'is-invalid': !!errors.password})}
                        className='form-control'
                        id="currentCityName"
                        name="currentCityName"
                        value={currentCityName}
                        onChange={this.handleChange}
                        onKeyPress={this._onkeyPress}
                    />
                    {tilesError === null ? '' : <span className="help-block">{"Invalid name of city!"}</span>}
                </InputGroup>




                <Row>
                    <Col xs="12" className="text-center">
                        <Button color="primary"
                            className="px-4 mb-4"
                            value="&gt;"
                        >
                            Button1
                  </Button>
                    </Col>
                </Row>
            </Form>

        );





        const form2 = (
            <React.Fragment>
                <CardGroup>
                    <Card >
                        <CardBody>
                            {form1}
                            <Form onSubmit={this.onSubmitForm}>
                                {/* <h1>Login</h1>
                              <p className="text-muted">Sign In to your account</p> */}
                                {/* {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''} */}

                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="text"
                                        placeholder="CityName"
                                        autoComplete="current-cityName"
                                        // className={classnames('form-control', { 'is-invalid': !!errors.password})}
                                        className='form-control'
                                        id="cityName"
                                        name="cityName"
                                        value={cityName}
                                        onChange={this.handleChange}
                                    />
                                    {/* {!!errors.password ? <span className="help-block">{errors.password}</span> : ''} */}
                                </InputGroup>


                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="text"
                                        placeholder="CityType"
                                        autoComplete="current-cityType"
                                        // className={classnames('form-control', { 'is-invalid': !!errors.password})}
                                        className='form-control'
                                        id="cityType"
                                        name="cityType"
                                        value={cityType}
                                        onChange={this.handleChange}
                                    />
                                    {/* {!!errors.password ? <span className="help-block">{errors.password}</span> : ''} */}
                                </InputGroup>



                                <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="text"
                                        placeholder="Username"
                                        autoComplete="username"
                                        // className={classnames('form-control', { 'is-invalid': !!errors.email})}
                                        className='form-control'
                                        id="email"
                                        name="email"
                                        value={lng}
                                        onChange={this.handleChange}
                                    />
                                    {/* {!!errors.email ? <span className="help-block">{errors.email}</span> : ''} */}
                                </InputGroup>

                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="text"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        // className={classnames('form-control', { 'is-invalid': !!errors.password})}
                                        className='form-control'
                                        id="password"
                                        name="password"
                                        value={lat}
                                        onChange={this.handleChange}
                                    />
                                    {/* {!!errors.password ? <span className="help-block">{errors.password}</span> : ''} */}
                                </InputGroup>

                                <Row>
                                    <Col xs="12" className="text-center" >
                                        <Button color="primary" className="px-4 mb-4">Button2</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                    {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                        <CardBody className="text-center">
                          <div>
                            <h2>Sign up</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                              labore et dolore magna aliqua.</p>
                            <Link to="/register">
                              <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                            </Link>
                          </div>
                        </CardBody>
                      </Card> */}
                </CardGroup>

                {/* </Row>
                </Container>
              </div> */}
            </React.Fragment>
        );
        const { tilesLoading } = this.props;

        return (
            <div className="hotel-dashboard-body container-fluid">
                <div className="row">
                    <div className="hotel-dashboard-left hotel-dashboard-column col-md-7">
                        <div ref={el => this.mapContainer = el} id='hotel-dashboard-map' />
                    </div>
                    <div className="hotel-dashboard-right hotel-dashboard-column col-md-5">
                        <div id="hotel-dashboard-listings" className="center">
                            <CentrPageSpinner loading={tilesLoading} />
                            {form2}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        cityName,
        country,
        tilesLoading,
        tilesError
    } = state.weather;
    //console.log("state.weather",state.weather);
    return {
        cityName,
        country,
        tilesLoading,
        tilesError
    };
}

export default compose(
    withWeatherService(),
    connect(mapStateToProps, null)
)(HotelDashboard);

