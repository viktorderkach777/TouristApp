import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import mapMarkerIcon from './marker-icon.svg';
import { Button, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { tilesLoaded, tilesError, tilesRequested } from '../../../../weather/actions';
import compose from '../../../../../utils/compose';
import withWeatherService from '../../../../weather/components/hoc';
import withMapService from '../../../../map/components/hoc';
import { markersLayerLoading, markersLayerError, markersLayerRequested } from '../../../../map/actions';
import Select from 'react-select';
import './hotelDashboard.css';

const ErrorIndicator = React.lazy(() => import('../../../../errorIndicator'));
const CentrPageSpinner = React.lazy(() => import('../../../../CentrPageSpinner'));
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ID;

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

class HotelDashboard extends Component {
    map;
    markerRef;

    state = {
        lng: -79.38,
        lat: 43.65,
        zoom: 7.5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMi0QnVvJROe-0oXg0a29J9mJLk2c9JMnuC3F893xeKMa2R_ou",
        name: 'Hotel Name',
        // email: '',
        // password: '',
        country: 'Ukraine',
        region: 'Rivne',
        rate: 5,
        errors: {
        },
        done: false,
        isLoading: false,
        cityType: "",
        cityName: "",
        marker: null,
        popup: null,
        currentCityName: "",
        statusText: "",
        features: [],
        selectedOption: null,
        options: []
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

        const { dispatch, mapService } = this.props;
        dispatch(markersLayerRequested());
        mapService.getMarkersLayer()
            .then((hotels) => {
                dispatch(markersLayerLoading(hotels))
                //console.log("hotels", hotels);
                //this.locations(hotels);
                this.setState({
                    features: hotels.features,
                    options: this.locations(hotels)
                });

            })
            .catch((err) => dispatch(markersLayerError(err)))
    }

    locations = (hotels) => {
        let arr = hotels.features.map((element) => {
            const { id, name, region, country } = element.properties;
            return ({
                value: id,
                label: name + '/ ' + region + '/ ' + country
            })
        })
        return arr;
    }

    createMarker() {
        const { marker, popup, image, name, lng, lat, country, region, rate } = this.state;

        // const descript =
        //     '<div>' +
        //     '<h2 style="text-align: center">' + name + '</h2>' +
        //     '<img class="hotel-dashboard-image" alt="marker" + src="' + image + '"/>'
        //     + '</div>';

            const descript =
            '<h3 >' + name + '</h2>' +
            '<div class="img-hover-zoom">'+
            '<img alt="marker" + src="' + image + '" />' +
            '</div>' +
            '<div class="stars" style="padding-bottom: 0px;">' + this.setStars(rate) + '</div>' +
            '<h4 style="padding-top: 0px;">' + country + ', ' + region + '</h4>';

        if (popup) popup.remove();

        const newpopup = new mapboxgl.Popup({ offset: [0, -5] })
            .setLngLat([lng, lat])
            .setHTML(
                descript
            )
            .addTo(this.map);

        if (marker) marker.remove();
        const newmarker = new mapboxgl.Marker(this.markerRef, {
            draggable: false,
        })
            .setLngLat([lng, lat])
            .setPopup(newpopup)
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

    selectHandleChange = selectedOption => {
        this.setState({ selectedOption });

        const id = selectedOption.value;
        const { hotels } = this.props;
        const element = hotels.features.filter((el) => el.properties.id === id);

        if (element) {
            const { image, name, country, region, rate } = element[0].properties
            this.setState({
                image,
                name,
                country,
                region,
                rate
            })
        }
        //console.log(`element:`, element);
        //console.log(`Option selected:`, selectedOption);
    };

    setStars(stars) {
        let nstars = parseInt(stars, 10);

        let text = '';
        for (let i = 0; i < 5; i++) {
            if (i <= nstars - 1) {
                text = text + '<span class="fa fa-star checked"></span>';
            }
            else {
                text = text + '<span class="fa fa-star"></span>';
            }
        }
        return text;
    }


    render() {
        if (this.map) {
            this.map.resize();
        }
        const { selectedOption, options } = this.state;
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
                            <i className="fa fa-search" aria-hidden="true"></i>
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
                            Search
                  </Button>
                    </Col>
                </Row>
            </Form>
        );

        const form2 = (
            <React.Fragment>
                {form1}
                <Select
                    value={selectedOption}
                    onChange={this.selectHandleChange}
                    options={options}
                    className="mb-4"
                />
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
                            <Button color="primary" className="px-4 mb-4">Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        );
        const { tilesLoading, markersLayerLoading, hotels, markersLayerError } = this.props;

        return (
            <div className="hotel-dashboard-body container-fluid">
                <div className="row">
                    <div className="hotel-dashboard-left hotel-dashboard-column col-md-7">
                        <div ref={el => this.mapContainer = el} id='hotel-dashboard-map' />
                    </div>
                    <div className="hotel-dashboard-right hotel-dashboard-column col-md-5">
                        <div id="hotel-dashboard-listings" className="center">
                            <CentrPageSpinner loading={tilesLoading || markersLayerLoading || Object.keys(hotels).length === 0} />
                            {markersLayerError || tilesError ? <ErrorIndicator /> : form2}
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
    const {
        markersLayerLoading,
        markersLayerError,
        hotels
    } = state.map;
    //console.log("state.weather",state.weather);
    return {
        hotels,
        markersLayerLoading,
        markersLayerError,
        cityName,
        country,
        tilesLoading,
        tilesError
    };
}

export default compose(
    withWeatherService(),
    withMapService(),
    connect(mapStateToProps, null)
)(HotelDashboard);

