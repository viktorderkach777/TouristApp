import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from '../../../../utils/compose';
import withWeatherService from '../hoc';
import { cityDataLoadedByDay, tilesLoaded, tilesError, tilesRequested } from '../../actions';
//import WeatherList from '../weather-list';
//import Spinner from '../spinner';
//import ErrorIndicator from '../error-indicator';
import CentrPageSpinner from '../../../CentrPageSpinner';
const WeatherList = React.lazy(() => import('../weatherList'));
//const Spinner = React.lazy(() => import('../spinner'));
const ErrorIndicator = React.lazy(() => import('../../../errorIndicator'));

class WeatherListContainer extends Component {

    componentDidMount() {
        //console.log("WeatherListContainer", this.props);

        this.props.fetchTiles(this.props.region);
    }    

    render() {
        const { tiles, tilesLoading, tilesError, clickTile } = this.props;
        //console.log("WeatherListContainer-props", this.props);
        if (tilesLoading) {
            return <CentrPageSpinner loading={tilesLoading} />
        }

        if (tilesError) {
            return <ErrorIndicator />
        }

        return (
            <WeatherList tiles={tiles} clickTile={clickTile} />
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { weatherService } = ownProps;
    //onst region = 'Kyiv';

    return {
        fetchTiles: (region) => {
            dispatch(tilesRequested());
            weatherService.getTiles(region)
                .then((tiles) => {
                    dispatch(tilesLoaded(tiles))
                })
                .catch((err) => dispatch(tilesError(err)))
        },

        clickTile: (name) => {
            dispatch(cityDataLoadedByDay(name))
        }
    }
};

const mapStateToProps = (state) => {
    const { tiles, tilesLoading, tilesError, region } = state.weather;
    //console.log("state.weather", state.weather)
    return {
        tiles,
        tilesLoading,
        tilesError,
        region
    };
};

export default compose(
    withWeatherService(),
    connect(mapStateToProps, mapDispatchToProps)
)(WeatherListContainer); 