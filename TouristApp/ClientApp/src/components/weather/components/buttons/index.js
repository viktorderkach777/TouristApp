import React, { Component } from 'react';
import {
    Row,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { regionLoaded } from '../../actions';
import compose from '../../../../utils/compose';
import withWeatherService from '../hoc';
import { tilesLoaded, tilesError, tilesRequested } from '../../actions';

class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    buttonClick = (e) => {
        //console.log("e", e.target.value);
        //console.log("button-this.props", this.props);
        this.props.regionLoaded(e.target.value);//this.props.weatherService, this.props.dispatch
        this.props.fetchTiles(e.target.value);
    }

    currentClick = () => {
             const detectLocation = new Promise((resolve,reject) => {
                if ("geolocation" in navigator) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    const region= {
                        latitude:position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    resolve(region);
                  }, (error) => {
                    if(error.code === error.PERMISSION_DENIED) {
                      console.error("Error detecting location.");
                    }
                  });
                }
              });

              detectLocation.then((location) => {               
                console.log("location", location);
                this.props.regionLoaded(location);
                this.props.fetchTiles(location);
              }).catch((err) => {
                console.log("error", err);
                this.props.regionLoaded('Minsk');
                this.props.fetchTiles('Minsk');
                //this.props.dispatch(fetchData("london"));
              });


        //console.log("e", e.target.value);
        //console.log("button-this.props", this.props);
        // this.props.regionLoaded(e.target.value);//this.props.weatherService, this.props.dispatch
        // this.props.fetchTiles(e.target.value);
    }

    render() {
        return (
            <Row>
                <Button value="Lutsk" onClick={(e) => this.buttonClick(e)}>Lutsk</Button>
                <Button value="Lviv" onClick={(e) => this.buttonClick(e)}>Lviv</Button>
                <Button value="Current position" onClick={() => this.currentClick()}>Current position</Button>
            </Row>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { weatherService } = ownProps;   

    return {
        fetchTiles: (region) => {
            dispatch(tilesRequested());
            weatherService.getTiles(region)
                .then((tiles) => {
                    dispatch(tilesLoaded(tiles))
                })
                .catch((err) => dispatch(tilesError(err)))
        },

        // clickTile: (name) => {
        //     dispatch(cityDataLoadedByDay(name))
        // },

        regionLoaded: (region) => dispatch(regionLoaded(region))
    }
};

export default compose(
    withWeatherService(),
    connect(null, mapDispatchToProps)
)(Buttons); 