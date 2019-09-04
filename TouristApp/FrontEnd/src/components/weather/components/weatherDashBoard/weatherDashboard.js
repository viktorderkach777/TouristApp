import React from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,    
    CardBody    
} from 'reactstrap';
//import WeatherListContainer from '../weather-list-container';
//import WeatherCity from '../weather-city';

const WeatherListContainer = React.lazy(() => import('../weatherListContainer'));
const WeatherCity = React.lazy(() => import('../weatherCity'));

const weatherDashboard = () => {

    return (
        <Container>
            <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                    <Card body outline color="primary">
                        <CardTitle>
                            <WeatherCity />
                        </CardTitle>
                        <CardBody>
                            <Row>
                                <WeatherListContainer />
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default weatherDashboard;