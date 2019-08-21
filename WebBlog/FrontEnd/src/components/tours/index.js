import React, { Component } from 'react';
import { connect } from 'react-redux'
import get from 'lodash.get';
//import { Col, Row } from 'react-bootstrap';
//import axios from 'axios';
//import { LinkContainer } from "react-router-bootstrap";
//import classnames from 'classnames';
//import styled from 'styled-components'
import './tours.css';
//import './custom.css';
//import HotelService from "./hotelService";
import * as tourAction from './tourReducer';
//import SpinnerWidget from  "../../components/spinnerStep";
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

const SpinnerWidget = React.lazy(() => import('../CentrPageSpinner/index'));

class ToursContainer extends Component {

    componentDidMount() {
        this.props.getListTours();
    }
   

    render() {

        console.log('----state-----', this.state);
        console.log('----Props-----', this.props);
        const { isListLoading } = this.props;

   
        const toursList = (

            this.props.list.map(item => (


                <Card  key={item.id} className="CardTours" >
                    <Row>
                        <Col sm="3">
                        <CardLink href="#">
                            <CardImg className="CardImg" src="https://www.ittour.com.ua/images/itt_hotel_image/4/4/5/5/2/0/file_name/5.jpg" alt="Card image cap" />
                            <div className="discount">
                                                 <span className="discount-title">
                                                     знижка 15%
                                                </span>
                            </div>
                        </CardLink>
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
                            <Button size="sm" className="buttonHotel">Дивитись тур</Button>
                        </Col>
                    </Row>
                </Card>

            )));


        return (

            <React.Fragment>
                
                <Row  >
                    <Col sm="12">
                        {toursList}
                        <SpinnerWidget loading={isListLoading} />
                    </Col>
                </Row>

            </React.Fragment>
        );
    }
};

const mapState = state => {
    return {
        list: get(state, 'tours.list.data'),
        isListLoading: get(state, 'tours.list.loading'),
        isListError: get(state, 'tours.list.error'),

    };
};
const mapDispatch = dispatch => {
    return {
        getListTours: () =>
            dispatch(tourAction.getListTours())

    };
};

const TourWidget =
    connect(mapState, mapDispatch)(ToursContainer);

export default TourWidget;
