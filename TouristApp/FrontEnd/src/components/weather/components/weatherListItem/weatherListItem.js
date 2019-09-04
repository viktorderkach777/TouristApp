import React from 'react';
import {   
    Row,
    Col,
    Card,   
    CardBody,
    
} from 'reactstrap';
import './weatherListItem.css';

const WeatherListItem = ({ tile, onClick }) => {
   
    const { tempMax, tempMin, icon, day, calendDay, calendMonth } = tile;
    return (
        <Col>           
            <Card tag="a" style={{ cursor: "pointer"}} onClick={onClick} body outline color="primary">
                <CardBody >
                    <Row>
                        <div className="center">
                            {day}
                        </div>
                    </Row>
                    <Row>
                        <div className="center">
                            <strong>{calendDay}</strong>
                        </div>
                    </Row>
                     <Row>
                        <div className="center month">
                            {calendMonth}
                        </div>
                    </Row> 
                    <Row>
                        <div className="center">
                            <img src={icon} alt="alt"></img>
                        </div>
                    </Row>
                    <Row>
                        <div className="center">
                            <strong>{tempMax}&deg;</strong>/{tempMin}&deg;
                        </div>
                    </Row>
                </CardBody>
            </Card>           
        </Col >

    );
};

export default WeatherListItem;