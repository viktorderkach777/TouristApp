import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import './mapNavigation.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ID;

class MapNavigation extends Component {
    map;
    state = {
        lng: -79.38,
        lat: 43.65,
        zoom: 7.5
    }    

    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom
        });

        this.map.on('load', () => {
            this.map.resize();
        });

        let directs = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric'
        })

        this.map.addControl(directs, 'top-right');
    }

    render() {        

        return (
            <div id="navigation-body">
                <div ref={el => this.mapContainer = el} id='navigation-map' />
            </div>
        );
    }
}

export default MapNavigation;