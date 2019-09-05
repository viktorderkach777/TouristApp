import React, { Component } from 'react';
import { connect } from 'react-redux'
import get from 'lodash.get';
import { Link } from 'react-router-dom';
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
  Form,
  Card,
  FormGroup,
  Label,
  Input,
  Button,
  CardHeader,
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
const SortToolbar = React.lazy(() => import('../SortToolbar'));
const PaginationBar = React.lazy(() => import('../Pagination'));

class ToursContainer extends Component {
  state = {
    currentPage: null,
    totalPages: null
  }

  componentDidMount() {
    const { currentPage, totalPages } = this.props;
    this.props.getListTours(currentPage);
    this.setState({ currentPage: currentPage });
    this.setState({ totalPages: totalPages });
  }

  onPageChanged = data => {

  console.log('---data from pagination',data);
  this.props.getListTours(data);
  this.setState({ currentPage: data });
  
  }

  render() {
    console.log('----State Tours -----', this.state);
    console.log('----Props Tours-----', this.props);
    const { isListLoading, totalPages, currentPage } = this.props;

    const filterlist = (
      <Form>
        <Card className="CardTours">
          <CardBody>
            <CardHeader>217 знайдено</CardHeader>

            <FormGroup row className="justify-content-md-center">
              <h4>  Країни вильоту </h4>
              <Label for="checkbox2" ></Label>
              <Col sm={{ size: 10 }}>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" id="checkbox2" />{' '} Київ
                                        </Label>
                </FormGroup>
              </Col>
              <Col sm={{ size: 10 }}>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" id="checkbox2" />{' '} Львов
                                        </Label>
                </FormGroup>
              </Col>
              <Col sm={{ size: 10 }}>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" id="checkbox2" />{' '} Одесса
                                        </Label>
                </FormGroup>
              </Col>
            </FormGroup>


            <h4>Клас готелю</h4>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
              <label className="form-check-label" htmlFor="inlineCheckbox2">2*</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
              <label className="form-check-label" htmlFor="inlineCheckbox3">3*</label>
            </div>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option2" />
              <label className="form-check-label" htmlFor="inlineCheckbox4">4*</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox5" value="option3" />
              <label className="form-check-label" htmlFor="inlineCheckbox5">5*</label>
            </div>

            <Row className="justify-content-md-center">
              <Button className="btn btn-info btn-sm" style={{ backgroundColor: "#ff9000" }}>Примінити</Button>
            </Row>
          </CardBody>
        </Card>
      </Form>
    );

    const toursList = (


      this.props.list.map(item => (


        <Card key={item.id} className="CardTours" >
          <Row>
            <Col sm="4">
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
            <Col sm="2" style={{ verticalAlign: 'bottom' }}>
              <div className="price-block">
                <div className="price">{item.price}
                  <span className="currency"> ₴</span>
                </div>
              </div>
              <Link to={`/views/${item.country}/${item.id}`}>
                <Button size="sm" className="buttonHotel">Дивитись тур</Button>
              </Link>
            </Col>
          </Row>
        </Card>

      )));


    return (

      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-3">
              {filterlist}
            </div>
            <div className="col-9">
              <SortToolbar />
              {toursList}
              {/* <SpinnerWidget loading={isListLoading} /> */}
              <PaginationBar totalPages={totalPages} currentPage={currentPage} pageNeighbours={1} onPageChanged={this.onPageChanged}/>
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }
};

const mapState = state => {
  return {
    list: get(state, 'tours.list.data'),
    isListLoading: get(state, 'tours.list.loading'),
    isListError: get(state, 'tours.list.error'),
    currentPage: get(state, 'tours.list.currentPage'),
    totalPages: get(state, 'tours.list.totalPages'),
  };
};

const mapDispatch = (dispatch) => {
  return {
    getListTours: (model) => {
      dispatch(tourAction.getListTours(model))
    }
  };
};

const TourWidget =
  connect(mapState, mapDispatch)(ToursContainer);

export default TourWidget;
