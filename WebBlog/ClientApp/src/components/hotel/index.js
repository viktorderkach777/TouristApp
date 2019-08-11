import React, { Component } from 'react';
import { connect } from 'react-redux'
import get from 'lodash.get';
//import { Col, Row } from 'react-bootstrap';
//import axios from 'axios';
//import { LinkContainer } from "react-router-bootstrap";
//import classnames from 'classnames';
//import styled from 'styled-components'
import './hotels.css';
//import HotelService from "./hotelService";
import * as hotelAction from './hotelReducer';

import {

    Card,
    Button,
    CardTitle,
    CardText,
    CardImg,
    CardBody,
    CardSubtitle,
    Row,
    Col,
} from 'reactstrap';

class HotelContainer extends Component {

    componentDidMount() {
        this.props.getListHotel();
    }



    render() {
        console.log('----state-----', this.state);
        console.log('----Props-----', this.props);
        const hotelList = (

            this.props.list.map(item => (


                <Card key={item.id} >
                    <Row>
                        <Col sm="3">
                            <CardImg width="100" src="https://www.ittour.com.ua/images/itt_hotel_image/4/4/5/5/2/0/file_name/5.jpg" alt="Card image cap" />
                        </Col>
                        <Col sm="9">
                            <CardBody>
                                <CardTitle>{item.name} {item.class}*</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>{item.description}</CardText>
                                <Button >Смотреть тур</Button>
                            </CardBody>
                        </Col>
                    </Row>
                </Card>

            )));


        return (

            <React.Fragment>

                <Row>
                    <Col sm="12">
                        {hotelList}
                    </Col>
                </Row>

            </React.Fragment>
        );
    }
};

const mapState = state => {
    return {
        list: get(state, 'hotel.list.data'),
        isListLoading: get(state, 'hotel.list.loading'),
        isListError: get(state, 'hotel.list.error'),

    };
};
const mapDispatch = dispatch => {
    return {
        getListHotel: () =>
            dispatch(hotelAction.getListHotel())

    };
};

const Hotel =
    connect(mapState, mapDispatch)(HotelContainer);

export default Hotel;
