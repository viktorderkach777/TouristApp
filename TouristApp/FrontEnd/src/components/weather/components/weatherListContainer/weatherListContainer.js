import React, { Component } from 'react';
import { connect } from 'react-redux';
import  compose  from '../../../../utils/compose';
import withWeatherService from '../hoc';
import { fetchTiles, cityDataLoadedByDay } from '../../actions';
//import WeatherList from '../weather-list';
//import Spinner from '../spinner';
//import ErrorIndicator from '../error-indicator';
import CentrPageSpinner from '../../../CentrPageSpinner';

const WeatherList = React.lazy(() => import('../weatherList'));
//const Spinner = React.lazy(() => import('../spinner'));
const ErrorIndicator = React.lazy(() => import('../../../errorIndicator'));

class WeatherListContainer extends Component {

    componentDidMount() {
        console.log("WeatherListContainer",this.props);
        
        this.props.fetchTiles('Kyiv');        
    }

    // componentWillReceiveProps(props, next){
    //     if(props =! next){
    //         this.props.fetchTiles('Kyiv'); 
    //     }
    // }

    render() {
        const { tiles, tilesLoading, tilesError, clickTile } = this.props;
        console.log("WeatherListContainer-props", this.props);
        if (tilesLoading) {
            return <CentrPageSpinner loading={tilesLoading} />
        }

        if (tilesError) {
            return <ErrorIndicator />
        }

        return (
            <WeatherList tiles={tiles} clickTile={clickTile}/>            
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { weatherService } = ownProps;

    return {
        fetchTiles: (region)=>fetchTiles(weatherService, dispatch, region),
        clickTile: (name) =>{
            dispatch(cityDataLoadedByDay(name))            
        }        
    }
};

const mapStateToProps = (state) => {
    const {tiles, tilesLoading,tilesError, region} = state.weather;
    console.log("state.weather", state.weather )
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