import React, { Component } from 'react';
import { connect } from 'react-redux'
import get from 'lodash.get';
import { withRouter,Link } from 'react-router-dom';
import propTypes from 'prop-types';
//import { Col, Row } from 'react-bootstrap';
//import axios from 'axios';
//import { LinkContainer } from "react-router-bootstrap";
//import classnames from 'classnames';
//import styled from 'styled-components'
import './hotels.css';
//import './custom.css';
//import HotelService from "./hotelService";
import * as hotelAction from './hotelReducer';
import SpinnerWidget from "../../components/spinnerStep";
import {
    Card,
    Button,
    CardTitle,
    CardText,
    CardImg,
    CardBody,
    CardSubtitle,
    CardLink,
    Row,
    Col,
} from 'reactstrap';

class HotelContainer extends Component {

    componentDidMount() {
        this.props.getListHotel();
    }

    operationTour = (e, type, id) => {
        e.preventDefault();

        switch (type) {

            case 'WATCH_TOUR':
                console.log('Watch tour with id: ', id);
                //this.props.deleteAnimal(id);


                break;
            case 'ADD_LIKE_TOUR':
                console.log('Add like for tour with  id: ', id);
                // this.props.addLikeAnimal(id);
                break;

            default:

        }
    };

    render() {

        console.log('----state-----', this.state);
        console.log('----Props-----', this.props);
        const { isListLoading } = this.props;

        const hotelList = (

            this.props.list.map(item => (


                <Card key={item.id} style={{ marginBottom: '15px', borderRadius: '10px' }} >
                    <Row>
                        <Col sm="3">
                        <Link to={`/views/${item.country}/${item.id}`}>
                                <CardImg className="CardImg" src="https://www.ittour.com.ua/images/itt_hotel_image/4/4/5/5/2/0/file_name/5.jpg" alt="Card image cap" />
                                <div className="discount">
                                    <span className="discount-title">
                                        знижка 15%
                                                </span>
                                </div>
                        </Link> 
                            <CardLink href="#">
                                <div className="Heart">
                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                </div>
                            </CardLink>
                        </Col>
                        <Col sm="6">
                            <CardBody>
                                <CardTitle className="CardTitle">
                                    {item.name} {item.class}*
                                </CardTitle>
                                <CardSubtitle className="CardSubTitle">
                                    <small> <i className="fa fa-map-marker" aria-hidden="true"></i>{item.country}, {item.region}</small>
                                </CardSubtitle>



                                <CardText>

                                    <li>
                                        <i className="fa fa-plane iconColor" aria-hidden="true"></i>
                                        <span className="skin-color hidden-xs"> Виліт: </span>
                                        {item.сityDeparture}, <span className="date-capitalize">{item.date}</span>
                                    </li>
                                    <li>
                                        <i className="fa fa-clock iconColor" aria-hidden="true"></i>
                                        <span className="skin-color hidden-xs"> Тривалість: </span>
                                        <b>{item.daysCount}</b> ночей
                                    </li>
                                    <li>
                                        <i className="fa fa-bus iconColor" aria-hidden="true"></i>
                                        <span className="skin-color hidden-xs"> Проїзд: </span>
                                        включений
                                    </li>
                                    <li>
                                        <i className="fa fa-credit-card iconColor" aria-hidden="true"></i>
                                        <span className="skin-color hidden-xs"> Ціна за: </span>
                                        2-ох дорослих
                                    </li>
                                </CardText>

                            </CardBody>

                        </Col>
                        <Col sm="3">
                            <div className="price-block">
                                <div className="price">{item.price}<span className="currency"> ₴</span>
                                </div>
                            </div>
                            <Link to={`/views/${item.country}/${item.id}`}>
                            <Button size="sm" className="buttonHotel"  >Дивитись тур</Button>
                            </Link>
                        </Col>
                    </Row>
                </Card>

            )));


        return (

            <React.Fragment>
                
                <Row>
                    <Col sm="12">
                        {hotelList}
                        <SpinnerWidget loading={isListLoading} />
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
       //     addLikeTour: (id) => 
       //          dispatch(hotelAction.addLikeTour(id)),
        //    watchTour: (id) => 
       //          dispatch(hotelAction.watchTour(id)),

    };
};
    HotelContainer.propTypes = {
    history: propTypes.object.isRequired,
    list: propTypes.array.isRequired, 
    isListError: propTypes.bool.isRequired,
    isListLoading: propTypes.bool.isRequired,
    getListHotel:propTypes.func.isRequired

};

const Hotel =withRouter(
    connect(mapState, mapDispatch)(HotelContainer));

export default Hotel;
