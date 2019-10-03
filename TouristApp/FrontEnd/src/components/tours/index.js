import React, { Component } from 'react';
import { connect } from 'react-redux'
import get from 'lodash.get';
import { Link } from 'react-router-dom';
import './tours.css';
import * as tourAction from '../../reducers/tourReducer';
import {
  Modal,ModalHeader,ModalFooter,ModalBody,
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
import { serverUrl } from '../../config';
const SpinnerWidget = React.lazy(() => import('../CentrPageSpinner/index'));
const SortToolbar = React.lazy(() => import('../SortToolbar'));
const PaginationBar = React.lazy(() => import('../Pagination'));

class ToursContainer extends Component {
  state = {
    currentPage: null,
    totalPages: null,
    sortOrder:'name',
    deleteDialog_isOpen: false,
    id_delete:0
  }

  componentDidMount() {
    const { currentPage, totalPages } = this.props;
    const { sortOrder  } = this.state;
    const model = {
      currentPage:currentPage,
      sortOrder:sortOrder,
      
    }
    console.log('---STEP1----',model);
    this.props.getListTours(model);
    this.setState({ currentPage: currentPage });
    this.setState({ totalPages: totalPages });
  }

  deleteTour = (e, id)  =>{
    
    this.toggleDialogDelete();
    this.setState({id_delete: id});
    console.log('delete tour with:',id);
    
  }

  toggleDialogDelete=() => {
    this.setState({
      deleteDialog_isOpen: !this.state.deleteDialog_isOpen
    });
  }

  onClickRemoveImageYes= () =>
  {
    const {id_delete}=this.state;
    this.props.deleteTour(id_delete);
    this.toggleDialogDelete();
  }

  onPageChanged = data => {
  
  console.log('---data from pagination',data);
  const { sortOrder  } = this.state;
  const model = {
    currentPage:data,
    sortOrder:sortOrder
  }
  console.log('---STEP2----',model);
  this.props.getListTours(model);
  this.setState({ currentPage: data });
  
  }



  render() {
    console.log('----State Tours -----', this.state);
    console.log('----Props Tours-----', this.props);
    const { isAuthenticated, roles,  isListLoading, totalPages, currentPage } = this.props;
    const {deleteDialog_isOpen,id_delete} =this.state;

    const deleteDialogContent = (deleteDialog_isOpen && 
          <Modal isOpen={true}>
            <form >
              <ModalHeader>Видалення</ModalHeader>
              <ModalBody>
                    Ви дійсно хочете видалити тур з id: <b>{id_delete}</b>  ?
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.onClickRemoveImageYes} className="btn btn-primary">Да</Button>
                <Button color="danger" onClick={this.toggleDialogDelete} >Скасувати</Button>
              </ModalFooter>
              </form>
            </Modal>
      );

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
            <Col sm="12" md="4">
              <Link to={`/views/${item.country}/${item.id}`}>
                <CardImg className="CardImg" src={!!item.imagePath ? serverUrl+item.imagePath:'https://www.ittour.com.ua/images/itt_hotel_image/4/4/5/5/2/0/file_name/5.jpg'} alt="Card image cap" />
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
            <Col sm="12" md="6">
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
            <Col sm="12" md="2" style={{ verticalAlign: 'bottom' }}>
              <div className="price-block">
                <div className="price">{item.price}
                  <span className="currency">₴</span>
                </div>
              </div>
              <Link to={`/views/${item.country}/${item.id}`}>
                <Button size="sm" className="buttonHotel">Дивитись тур</Button>
              </Link>
              <Button color="primary" className="DeleteTour" size="sm" hidden={roles !== "Admin"} onClick={e => this.deleteTour(e,item.id)}><i className="fa fa-trash" aria-hidden="true"/></Button>
            </Col>
          </Row>
        </Card>

      )));


    return (

      <React.Fragment>
        <div className="container">
          <div className="row">
           {deleteDialogContent}
            <div className="col-12 col-md-3">
              {filterlist}
            </div>
            <div className="col-12 col-md-9">
              <span> Status: {isAuthenticated} {roles}</span>
              <SortToolbar />
              {toursList}
               <SpinnerWidget loading={isListLoading} /> 
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
    isAuthenticated: get(state, 'auth.isAuthenticated'),
    roles: get(state, 'auth.user.roles')
  };
};

const mapDispatch = (dispatch) => {
  return {
    getListTours: (model) => {
      dispatch(tourAction.getListTours(model))
    },
    deleteTour: (tourId) => {
      dispatch(tourAction.deleteTour(tourId))
    }

  };
};

const TourWidget =
  connect(mapState, mapDispatch)(ToursContainer);

export default TourWidget;
