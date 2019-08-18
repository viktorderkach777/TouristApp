import React, { Component } from 'react';
import { connect } from 'react-redux'
import get from 'lodash.get';
//import { Col, Row } from 'react-bootstrap';
//import axios from 'axios';
//import { LinkContainer } from "react-router-bootstrap";
//import classnames from 'classnames';
//import styled from 'styled-components'
import './hotels.css';
//import './custom.css';
//import HotelService from "./hotelService";
import * as hotelAction from './hotelReducer';
import SpinnerWidget from  "../../components/spinnerStep";
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
   

    render() {

        console.log('----state-----', this.state);
        console.log('----Props-----', this.props);
        const { isListLoading } = this.props;
        
//         const page =(
//             <React.Fragment>

// <div class="tour-item-wrapper">
//                                     <div className="media tour-item">
//                                         <div className="media-left">
//                                             <a href="/travel/turkey/alanya/vella-beach-hotel-ex-angel-beach-hotel-3/tours/z8fSz8fSzJ3OxsfJnsrNnZvMns2bzs3PnsjHnJ3Lzp6cx5zPncc-/f769ce3deaaff146b6836e06f95d3dc3" 
//                                             className="check-tour">
//                                                 <div className="tour-img" data-src="" >
//                                                     </div></a>
//                                                 <div class="discount">
//                                                 <span class="discount-title">
//                                                     на 5% дешевле
//                                                 </span>
//                                             </div>
//                                                 <a href="#" className="cheaptour-favorite f-tour f-add" data-id="z8fSz8fSzJ3OxsfJnsrNnZvMns2bzs3PnsjHnJ3Lzp6cx5zPncc-"
//                                                 data-search_hash="f769ce3deaaff146b6836e06f95d3dc3">
//                                                 <i className="fa fa-heart-o" aria-hidden="true"></i>
//                                             </a>
//                                         </div>
//                                         <div className="media-body">
//                                             <a href="/travel/turkey/alanya/vella-beach-hotel-ex-angel-beach-hotel-3/tours/z8fSz8fSzJ3OxsfJnsrNnZvMns2bzs3PnsjHnJ3Lzp6cx5zPncc-/f769ce3deaaff146b6836e06f95d3dc3" 
 //                                       class="check-tour"><h4 class="media-heading">Gonul Palace 3* </h4></a>                                            
 //                                             <small>
//                                                 <i className="soap-icon-departure yellow-color"></i>
//                                                 Турция,
//                                                 Аланья                                                                                            </small>
//                                             <div className="row">
//                                                 <div className="col-xs-12 col-sm-12 col-md-12 col-lg-9">
//                                                     <div className="media-block">
//                                                         <div className="tour-feature">
//                                                             <div className="row">
//                                                                 <div className="col-xs-6 col-sm-12">
//                                                                     <ul>
//                                                                         <li>
//                                                                             <div className="icon take-off"><i className="soap-icon-plane-right yellow-color"></i></div>
//                                                                             <span className="skin-color hidden-xs">Вылет:</span>
//                                                                             Одесса, <span className="date-capitalize">24.08.2019, сб</span>
//                                                                         </li>
//                                                                         <li>
//                                                                             <div className="icon"><i class="soap-icon-clock yellow-color"></i></div>
//                                                                             <span className="skin-color hidden-xs">Длительность:</span>
//                                                                             <b>7</b> ночей
//                                                                         </li>
//                                                                         <li>
//                                                                             <div className="icon"><i className="fa fa-bus yellow-color"></i></div>
//                                                                             <span className="skin-color hidden-xs">Проезд:</span>
//                                                                             включен
//                                                                         </li>
//                                                                     </ul>
//                                                                 </div>
//                                                                 <div className="col-xs-6 col-sm-12">
//                                                                     <ul>
//                                                                         <li>
//                                                                             <div className="icon"><i className="fa fa-money yellow-color"></i></div>
//                                                                             <span className="skin-color hidden-xs">Цена за:</span>
//                                                                             2 взрослых
//                                                                         </li>
//                                                                         <li>
//                                                                             <div className="icon"><i className="soap-icon-comfort yellow-color"></i></div>
//                                                                             <span className="skin-color hidden-xs">Номер:</span>
//                                                                             DBL, Standard Room                                                                        </li>
//                                                                         <li>
//                                                                             <div className="icon"><i className="soap-icon-fork yellow-color"></i></div>
//                                                                             <span className="skin-color hidden-xs">Питание:</span>
//                                                                             AI, Всё включено                                                                        </li>
//                                                                     </ul>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="more-offers">
//                                                                 <div className="">
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-xs-12 col-md-12 col-lg-3 col-sm-12 media-block media-block-right">
//                                                     <div className="price-block">
//                                                         <div className="price">
//                                                                 <div className="price-average">
//                                                                 <span className="price-sum">&nbsp;19156</span><span className="currency">₴</span>
//                                                                 <i className="soap-icon-status" rel="popover" data-toggle="popover" data-placement="left" data-original-title="" data-trigger="hover" data-content="Указанная скидка <b>5%</b> основана на сравнении текущей цены с самой высокой ценой для тех же параметров поиска тура в пределах двух недель. Это означает, что теперь вы получите эту поездку по самой <b><i>низкой</i></b> цене.">
//                                                                 </i>
//                                                             </div>
//                                                                 <div className="price-saving">
//                                                                     Экономия 816₴
//                                                                 </div>
//                                                                                                                                                                                     <a href="/travel/turkey/alanya/vella-beach-hotel-ex-angel-beach-hotel-3/tours/z8fSz8fSzJ3OxsfJnsrNnZvMns2bzs3PnsjHnJ3Lzp6cx5zPncc-/f769ce3deaaff146b6836e06f95d3dc3" class="check-tour"><span class="price-name"></span> 18340<span class="currency">₴</span></a>                                                        </div>

//                                                         <div className="prices">
//                                                             <small>626  <span className="currency">€</span></small>
                                                            
//                                                             <small>
//                                                                 <span className="currency">$</span>698                                                            </small>
//                                                         </div>
//                                                     </div>
//                                                     <div className="action media-block-bottom">
//                                                         <div className="block-with-ajax">
//                                                         <a href="/travel/turkey/alanya/vella-beach-hotel-ex-angel-beach-hotel-3/tours/z8fSz8fSzJ3OxsfJnsrNnZvMns2bzs3PnsjHnJ3Lzp6cx5zPncc-/f769ce3deaaff146b6836e06f95d3dc3" class="button sky-blue1 btn-small full-width check-tour btn-show-tour" data-search_hash="f769ce3deaaff146b6836e06f95d3dc3" data-key="z8fSz8fSzJ3OxsfJnsrNnZvMns2bzs3PnsjHnJ3Lzp6cx5zPncc-">Смотреть тур</a>                                                        <div class="ajax-loading">
//                                                             <img src="/img/ajax-loader.gif?1556633336" alt=""/>>
                                                                
//                                                             </div>

//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     </div>
//                                 </div>
//             </React.Fragment>
//         );    
   
        const hotelList = (

            this.props.list.map(item => (


                <Card key={item.id} style={{marginBottom: '15px',borderRadius:'10px'}} >
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
                <SpinnerWidget loading={isListLoading} />
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
