import React, { Component } from 'react';
import {
    //Container,
    Row,
    Col,
    Card,
    CardBody,
} from 'reactstrap';
//import Buttons from '../buttons';
import './weatherDashboard.css';
import Locations from '../locations';

const WeatherListContainer = React.lazy(() => import('../weatherListContainer'));
const WeatherCity = React.lazy(() => import('../weatherCity'));

class WeatherDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        //console.log("WeatherDashboard-props", this.props);  color="primary"     
        return (
            <div id="weather-dashboard-body">
                {/* <Container >
                    <Buttons />
                    <Row> */}
                        {/* <Col sm="12" md={{ size: 10, offset: 1 }}> */}
                        <Col id='weather-dashboard-map' className='weather-dashboard-map'>
                            <Card body outline className="CardWeather" style={{ minHeight: "800px" }}>
                                {/* <CardTitle> */}
                                <WeatherCity />
                                {/* </CardTitle> */}
                                <CardBody>
                                    <Row>
                                        <WeatherListContainer />
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className='weather-dashboard-sidebar'>
                            <div >
                                <div className='weather-dashboard-heading'>
                                    <h1>Our locations</h1>
                                </div>
                                <div id='weather-dashboard-listings' className='weather-dashboard-listings'>
                                    {/* {locations} */}
                                    <Locations/>
                                </div>
                            </div>
                        </Col>
                    {/* </Row>
                </Container> */}
                {/* <CentrPageSpinner loading={markersLayerLoading} /> */}
                {/* {markersLayerError ? <ErrorIndicator /> :
                    ( */}

                {/* )} */}
            </div>



            // <div id="body">
            //     <div ref={el => this.mapContainer = el} id='map' className='map pad2' />
            //     <CentrPageSpinner loading={markersLayerLoading} />
            //     {markersLayerError ? <ErrorIndicator /> :
            //         (<div className='mysidebar'>
            //             <div className='heading'>
            //                 <h1>Our locations</h1>
            //             </div>
            //             <div id='listings' className='listings'>
            //                 {locations}
            //             </div>
            //         </div>)}
            // </div>


            // <>
            //     <Container>
            //         <Buttons />
            //         <Row>
            //             <Col sm="12" md={{ size: 10, offset: 1 }}>
            //                 <Card body outline className="CardWeather" style={{ minHeight: "800px" }}>
            //                     {/* <CardTitle> */}
            //                     <WeatherCity />
            //                     {/* </CardTitle> */}
            //                     <CardBody>
            //                         <Row>
            //                             <WeatherListContainer />
            //                         </Row>
            //                     </CardBody>
            //                 </Card>
            //             </Col>
            //         </Row>
            //     </Container>
            // </>
        );
    }
}

export default WeatherDashboard;


