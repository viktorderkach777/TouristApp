import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    //Button
} from 'reactstrap';
import Buttons from '../buttons';

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
      
        console.log("WeatherDashboard-props", this.props);
       
        return (
            <Container>
               <Buttons/>
                <Row>
                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                        <Card body outline color="primary">
                            <CardTitle>
                                <WeatherCity />
                            </CardTitle>
                            <CardBody>
                                <Row>
                                    <WeatherListContainer/>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default WeatherDashboard;

// const WeatherDashboard = (props) => {
//     const { region } = props;
//     console.log("props-region", region);
//     return (
//         <Container>
//             <Row>
//                 <Button>Lutsk</Button>
//                 <Button>Rivne</Button>
//             </Row>
//             <Row>
//                 <Col sm="12" md={{ size: 10, offset: 1 }}>
//                     <Card body outline color="primary">
//                         <CardTitle>
//                             <WeatherCity />
//                         </CardTitle>
//                         <CardBody>
//                             <Row>
//                                 <WeatherListContainer region={region} />
//                             </Row>
//                         </CardBody>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

//export default WeatherDashboard;