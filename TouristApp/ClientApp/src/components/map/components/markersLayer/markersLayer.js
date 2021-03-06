import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from '../../../../utils/compose';
import withMapService from '../hoc';
import { markersLayerLoading, markersLayerError, markersLayerRequested } from '../../actions';
import mapboxgl from 'mapbox-gl';
import './markersLayer.css';
const ErrorIndicator = React.lazy(() => import('../../../errorIndicator'));
const CentrPageSpinner = React.lazy(() => import('../../../CentrPageSpinner'));
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ID;

class MarkersLayer extends Component {
    map;

    state = {
        active: null,
        popup: null,
        zoom: 5       
    };   
    
    componentDidMount() {
        const {dispatch, mapService} = this.props;
        dispatch(markersLayerRequested());
        mapService.getMarkersLayer()
            .then((hotels) => {
                dispatch(markersLayerLoading(hotels))                

                this.map = new mapboxgl.Map({
                    container: this.mapContainer,
                    style: 'mapbox://styles/mapbox/streets-v10',                   
                    center: hotels.features[0].geometry.coordinates,
                    zoom: this.state.zoom
                });

                this.map.on('load', () => {
                    this.map.addSource('places', {
                        type: 'geojson',
                        data: hotels
                    });
                });

                this.map.addControl(new mapboxgl.NavigationControl());
                this.createAllMarkers();
            })
            .catch((err) => dispatch(markersLayerError(err)))
    }

    createMarker(index) {
        const { hotels } = this.props;
        var el = document.createElement('div');

        // Add a class called 'marker' to each div
        el.className = 'map-marker';       
        el.onclick = () => this.linkOrMarkerClick(hotels.features[index], index);

        // By default the image for your custom marker will be anchored
        // by its center. Adjust the position accordingly
        // Create the custom markers, set their position, and add to map
        new mapboxgl.Marker(el, { offset: [17, 0] })
            .setLngLat(hotels.features[index].geometry.coordinates)
            .addTo(this.map);
    }

    createAllMarkers = () => {        
        const { hotels, markersLayerLoading } = this.props;       

        const res = markersLayerLoading ? null : (hotels.features.forEach((element, index)=>{
            this.createMarker(index)
        }));        
        
        return res;
    }

    flyToMarker(center, zoom) {
        this.map.flyTo({
            center,
            zoom
        });

        this.map.resize();
    }

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

    linkOrMarkerClick = (element, index) => {

        // 1. Fly to the point associated with the clicked link
        this.flyToMarker(element.geometry.coordinates, this.state.zoom);

        // 2. Close all other popups and display popup for clicked store
        // Check if there is already a popup on the map and if so, remove it
        if (this.state.popup) this.state.popup.remove();

        const descript =
            '<h3 >' + element.properties.name + '</h2>' +
            '<div class="img-hover-zoom">'+
            '<img alt="marker" + src="' + element.properties.image + '" />' +
            '</div>' +
            '<div class="stars" style="padding-bottom: 0px;">' + this.setStars(element.properties.rate) + '</div>' +
            '<h4 style="padding-top: 0px;">' + element.properties.country + ', ' + element.properties.region + '</h4>';
        
        const popup = new mapboxgl.Popup({ closeOnClick: false, offset: [17, 0] })
            .setLngLat(element.geometry.coordinates)
            .setHTML(descript)
            .addTo(this.map);

        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        this.setState({
            popup,
            active: "listing-" + index
        });
    };

    render() {

        const { markersLayerLoading, markersLayerError, hotels } = this.props;        
        const locations = markersLayerLoading || hotels === undefined || Object.keys(hotels).length === 0 ? null : hotels.features.map((element, index) => {

            // Shorten data.feature.properties to `prop` so we're not
            // writing this long form over and over again.
            const prop = element.properties;            

            return (
                <div key={index} className={this.state.active === 'listing-' + index ? 'item active' : 'item'} id={'listing-' + index}>
                    <span className="title" onClick={() => this.linkOrMarkerClick(element, index)}>{prop.name}</span>

                    <div>{prop.country + ', ' + prop.region}</div>
                </div>
            )
        })


        return (
            <div id="body">
                <div ref={el => this.mapContainer = el} id='map' className='map pad2' />
                <CentrPageSpinner loading={markersLayerLoading} />
                {markersLayerError ? <ErrorIndicator /> :
                    (<div className='mysidebar'>
                        <div className='heading'>
                            <h1>Our locations</h1>
                        </div>
                        <div id='listings' className='listings'>
                            {locations}
                        </div>
                    </div>)}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { markersLayerLoading, markersLayerError, hotels } = state.map;     
    return {
        hotels,
        markersLayerLoading,
        markersLayerError
    };
};

export default compose(
    withMapService(),
    connect(mapStateToProps, null)
)(MarkersLayer);