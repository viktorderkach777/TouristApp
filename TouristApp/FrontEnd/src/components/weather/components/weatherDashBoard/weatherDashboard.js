import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    //CardTitle,
    CardBody,
    //Button
} from 'reactstrap';
import Buttons from '../buttons';
import './weatherDashboard.css';
//import WeatherChart from '../../weatherChart';


//import WeatherListContainer from '../weather-list-container';
//import WeatherCity from '../weather-city';

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
            <>            
            <Container>
               <Buttons/>              
                <Row>
                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                        <Card body outline  className="CardWeather" style={{minHeight:"800px"}}>
                            {/* <CardTitle> */}
                                <WeatherCity />
                            {/* </CardTitle> */}
                            <CardBody>                           
                                <Row>
                                    <WeatherListContainer/>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </>
        );
    }
}

export default WeatherDashboard;