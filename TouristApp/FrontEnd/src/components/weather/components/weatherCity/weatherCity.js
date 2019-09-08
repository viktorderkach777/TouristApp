import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Thermometer from 'react-thermometer-component';
import WeatherChart from '../weatherChart';
import DayChart from '../dayChart';
import './weatherCity.css';

class WeatherCity extends Component {

    render() {
        //console.log("weathercity-props", this.props);     
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
            calendMonth,
            temps
        } = data;

        return (
            <>
                <Row>
                    <Col xs="6" sm="4">
                        <div style={{ margin: "40px" }}>
                            <Thermometer
                                theme="light"
                                value={tempMax}
                                max="50"
                                steps="1"
                                format="°C"
                                size="large"
                                height="300"
                            />
                        </div>
                    </Col>
                    <Col xs="6" sm="4">
                        {/* <Row> */}
                            <div className="city">
                                <p style={{ fontSize: "30px" }}><strong>{cityName}, {country}</strong></p>
                                <p style={{ fontSize: "18px" }}>{day}</p>
                                <p style={{ fontSize: "25px" }}>{weatherDescription}</p>
                                <img src={icon} alt="alt" ></img>
                                <p style={{ fontSize: "25px" }}><strong>{tempMax}&deg;</strong>/{tempMin}&deg;</p>
                            </div>
                        {/* </Row> */}
                    </Col>

                    <Col sm="4">
                        {/* <Row> */}
                            <div className="city">
                            <p style={{ fontSize: "30px" }}>{calendMonth}, {calendDay}</p>
                            <p style={{ fontSize: "18px" }}> Humidity: {humidity}%</p>
                            <p style={{ fontSize: "18px" }}> Pressure: {pressure} mm Hg</p>
                            <p style={{ fontSize: "18px" }}>Wind: {wind} m/s</p>
                            </div>
                        {/* </Row> */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="box">
                            <div className="child">
                                <WeatherChart tiles={tiles} />
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="box">
                            <div className="child">
                                <DayChart temps={temps} />
                            </div>
                        </div>
                    </Col>                   
                </Row>
                <Row>
                    <Col>
                        <div className="box">
                            <div className="child">
                                <WeatherChart tiles={tiles} />
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="box">
                            <div className="child">
                                <DayChart temps={temps} />
                            </div>
                        </div>
                    </Col>                   
                </Row>
            </>
            // <>
            //     <Row>
            //         <Col>
            //             <div style={{ margin: "40px" }}>
            //                 <Thermometer
            //                     theme="light"
            //                     value={tempMax}
            //                     max="50"
            //                     steps="1"
            //                     format="°C"
            //                     size="large"
            //                     height="300"
            //                 />
            //             </div>
            //         </Col>                   
            //         <Col>
            //             <Row>
            //                 <div className="city">
            //                     <h1 >{cityName}, {country}</h1>
            //                     <h5 >{day}</h5>
            //                     <h4 >{weatherDescription}</h4>
            //                     <img src={icon} alt="alt" className="city"></img>
            //                     <h3 ><strong>{tempMax}&deg;</strong>/{tempMin}&deg;</h3>
            //                 </div>
            //             </Row>
            //         </Col>

            //         <Col>
            //             <Row>
            //                 <div className="city">
            //                     <h3 style={{ marginBottom: "30px" }}>{calendMonth}, {calendDay}</h3>
            //                     <h5 > Humidity: {humidity}%</h5>
            //                     <h5 > Pressure: {pressure} mm Hg</h5>
            //                     <h5 >Wind: {wind} m/s</h5>
            //                 </div>
            //             </Row>
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col>
            //         <div className="graph">
            //         <WeatherChart tiles={tiles}  />
            //         </div>
            //         </Col>
            //         <Col>
            //         <div className="graph">
            //         <DayChart temps={temps} />
            //         </div>
            //         </Col>                   
            //     </Row>
            // </>
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
    } = state.weather;
    //console.log("state.weather",state.weather);
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