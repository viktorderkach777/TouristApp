import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from '../../../../utils/compose';
import withMapService from '../../../map/components/hoc';
import { markersLayerLoading, markersLayerError, markersLayerRequested } from '../../../map/actions';
import { tilesLoaded, tilesError, tilesRequested, regionLoaded } from '../../actions';
import withWeatherService from '../hoc';
import ErrorIndicator from '../../../errorIndicator';

//import './markersLayer.css';
//const ErrorIndicator = React.lazy(() => import('../../../errorIndicator'));
//const CentrPageSpinner = React.lazy(() => import('../../../CentrPageSpinner'));

class Locations extends Component {
    state = {
        active: null,
    }

    componentDidMount() {
        const { dispatch, mapService } = this.props;
        dispatch(markersLayerRequested());
        mapService.getMarkersLayer()
            .then((hotels) => {
                dispatch(markersLayerLoading(hotels))

            })
            .catch((err) => dispatch(markersLayerError(err)))
    }

    linkOrMarkerClick = (element, index) => {

        const { dispatch, weatherService } = this.props;

        const region = {
            latitude: (element.geometry.coordinates[1]).toFixed(4),
            longitude: element.geometry.coordinates[0].toFixed(4),
        };

        // console.log("location-this.props", this.props)
        // console.log("element.geometry.coordinates", element)
        //const region = "Rivne";
        dispatch(regionLoaded(region));
        dispatch(tilesRequested());
        weatherService.getTiles(region)
            .then((tiles) => {
                dispatch(tilesLoaded(tiles))
            })
            .catch((err) => dispatch(tilesError(err)))
        this.setState({
            active: "listing-" + index
        });
    };



    render() {

        const { markersLayerLoading, markersLayerError, hotels } = this.props;
        console.log("this.props", this.props);
        const locations = markersLayerLoading  ? null : hotels.features.map((element, index) => {

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
            <>
                {markersLayerError ? <ErrorIndicator /> :locations}
            </>);
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
    connect(mapStateToProps, null)
)(Locations);

//export default Locations;