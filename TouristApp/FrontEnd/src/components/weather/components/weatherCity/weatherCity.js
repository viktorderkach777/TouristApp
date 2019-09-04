import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import './weatherCity.css';

class WeatherCity extends Component {    

    render() {       
        const {
            cityDay,
            cityName,
            country,
            tiles,
            tilesLoading,
            tilesError
        } = this.props;

        if (tilesLoading || tilesError) {
            return null;
        }       

        const data = tiles.find((el) => {
            return (
                el.day === cityDay
            )
        });       

        const {
            // id,           
            tempMax,
            tempMin,
            icon,
            day,
            weatherDescription,
            humidity,
            pressure,
            wind,
            calendDay,
            calendMonth
        } = data;       

        return (
            <>
                <Row>
                    <Col>
                        <Row>
                            <div className="city">
                                <h1 >{cityName}, {country}</h1>
                                <h5 >{day}</h5>
                                <h4 >{weatherDescription}</h4>
                                <img src={icon} alt="alt" className="city"></img>
                                <h3 ><strong>{tempMax}&deg;</strong>/{tempMin}&deg;</h3>
                            </div>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <div className="city">
                                <h3 style={{ marginBottom: "30px" }}>{calendMonth}, {calendDay}</h3>
                                <h5 > Humidity: {humidity}%</h5>
                                <h5 > Pressure: {pressure} mm Hg</h5>
                                <h5 >Wind: {wind} m/s</h5>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = (state) => {    
    const {
        tiles,
        cityDay,
        cityName,
        country,
        tilesLoading,
        tilesError
    }=state.weather;
    return {
        tiles,
        cityDay,
        cityName,
        country,
        tilesLoading,
        tilesError
    };
}

export default connect(mapStateToProps)(WeatherCity);