import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from '../../../../utils/compose';
import withMapService from '../../../map/components/hoc';
import { markersLayerLoading, markersLayerError, markersLayerRequested } from '../../../map/actions';
import { tilesLoaded, tilesError, tilesRequested } from '../../actions';
import withWeatherService from '../hoc';
import './locations.css';
//import ErrorIndicator from '../../../errorIndicator';


const ErrorIndicator = React.lazy(() => import('../../../errorIndicator'));
//const CentrPageSpinner = React.lazy(() => import('../../../CentrPageSpinner'));

class Locations extends Component {
    state = {
        active: null,
    }

    componentDidMount() {
        const { fetchMarkers } = this.props;        
        fetchMarkers();
    }

    linkOrMarkerClick = (element, index) => {
        const { fetchTiles } = this.props;
        const region = {
            latitude: element.geometry.coordinates[1],
            longitude: element.geometry.coordinates[0],
        };        

        fetchTiles(region);
        this.setState({
            active: "weather-dashboard-listings-" + index
        });
    };

    render() {
        const { markersLayerLoading, markersLayerError, hotels } = this.props;
        //console.log("this.props", this.props);
        const locations = markersLayerLoading ? null : hotels.features.map((element, index) => {

            // Shorten data.feature.properties to `prop` so we're not
            // writing this long form over and over again.
            const prop = element.properties;

            return (
                <div key={index} className={this.state.active === 'weather-dashboard-listings-' + index ? 'locations-item locations-active' : 'locations-item'} id={'weather-dashboard-listings-' + index}>
                    <span className="locations-title" onClick={() => this.linkOrMarkerClick(element, index)}>{prop.name}</span>
                    <div>{prop.country + ', ' + prop.region}</div>
                </div>
            )
        })

        return (
            <>
                {markersLayerError ? <ErrorIndicator /> : locations}
            </>);
    }
}

const mapDispatchToProps = (dispatch, ownprops)=>{
    const {weatherService, mapService} = ownprops;

    return{
        fetchMarkers: ()=>{
            dispatch(markersLayerRequested());
            mapService.getMarkersLayer()
                .then((hotels) => {
                    dispatch(markersLayerLoading(hotels))    
                })
                .catch((err) => dispatch(markersLayerError(err)))
        },
        fetchTiles:(region)=>{           
            dispatch(tilesRequested());
            weatherService.getTiles(region)
                .then((tiles) => {
                    dispatch(tilesLoaded(tiles))
                })
                .catch((err) => dispatch(tilesError(err)))
        }
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
    withWeatherService(),
    withMapService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Locations);