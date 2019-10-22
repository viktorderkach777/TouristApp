import React, { Component } from 'react';
import { connect } from 'react-redux'
import get from 'lodash.get';
import { Link } from 'react-router-dom';
import './tours.css';
import * as tourAction from '../../reducers/tourReducer';
import {
  Modal, ModalHeader, ModalFooter, ModalBody,
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
import { serverUrl } from '../../config';
const SpinnerWidget = React.lazy(() => import('../CentrPageSpinner/index'));
const SortToolbar = React.lazy(() => import('../SortToolbar'));
const PaginationBar = React.lazy(() => import('../Pagination'));
const FilterWidjet = React.lazy(() => import('../filters'));

class ToursContainer extends Component {
  constructor(props) {
    super(props);


    //initializing state 
    this.state = {
      currentPage: 1,
      totalPages: null,
      deleteDialog_isOpen: false,
      id_delete: 0,
      sortOrder: 'name',
      filters: null,
      searchText: ''
    };
  }

  componentDidMount() {
    const { currentPage, filters, totalPages, sortOrder, searchText } = this.props;
    const model = {
      currentPage: 1,
      sortOrder: sortOrder,
      filters: filters,
      searchString: searchText
    }

    this.props.postListTours(model);
    this.setState({
      currentPage: currentPage,
      totalPages: totalPages,
      sortOrder: sortOrder,
      filters:filters
    });


  }


  componentDidUpdate(prevProps) {
    // if (this.props.sortOrder !== prevProps.sortOrder)
    // {
    //   const {searchText } = this.props;
    //     const model = {
    //       currentPage: 1,
    //       sortOrder: prevProps.sortOrder,
    //       filter: '',
    //       searchString: searchText
    //     }
    //     this.props.postListTours(model);
    //     console.log('---CHANGE PROPS----', model );
    // } 
    // else if (this.props.searchText !== prevProps.searchText)
    // {
    //   const {  sortOrder } = this.props;
    //     const model = {
    //       currentPage: 1,
    //       sortOrder: sortOrder,
    //       filter: '',
    //       searchString: prevProps.searchText
    //     }
    //     this.props.postListTours(model);
    //     console.log('---CHANGE PROPS----', model );
    // }
    // else if (this.props.currentPage !== prevProps.currentPage)
    // {
    //   const { searchText, sortOrder } = this.props;
    //     const model = {
    //       currentPage: prevProps.currentPage,
    //       sortOrder: sortOrder,
    //       filter: '',
    //       searchString:searchText
    //     }
    //     this.props.postListTours(model);
    //     console.log('---CHANGE PROPS----', model );
    // }




  }



  deleteTour = (e, id) => {

    this.toggleDialogDelete();
    this.setState({ id_delete: id });
    console.log('delete tour with:', id);

  }

  toggleDialogDelete = () => {
    this.setState({
      deleteDialog_isOpen: !this.state.deleteDialog_isOpen
    });
  }

  onClickRemoveImageYes = () => {
    const { id_delete } = this.state;
    this.props.deleteTour(id_delete);
    this.toggleDialogDelete();
  }

  onSortChanged = (data) => {
    console.log('---sort Type ---- ', data);
    this.props.setTypeSort(data);
    const { searchText, filters } = this.props;
    const model = {
      currentPage: 1,
      sortOrder: data,
      filters: filters,
      searchString: searchText
    }

    this.props.postListTours(model);

  }

  handleCheckChieldElement = (value) => {

    console.log('---VALUE enter---', value)
    let filters = this.state.filters;
    filters.forEach(filter => {
      filter.data.forEach(data => {
        if (data.value === value) {
          console.log('---isChecked---', data.isChecked)
          data.isChecked = !data.isChecked
        }
      })
    })
    this.setState({ filters: filters });
    this.props.setFilters(this.state.filters);
    const { sortOrder, searchText } = this.props;
    const model = {
      currentPage: 1,
      sortOrder: sortOrder,
      filters: filters,
      searchString: searchText
    }
    this.props.postListTours(model);

  }

  onSearchChanged = (searchText) => {
    console.log('---Search text ---- ', searchText);
    const { sortOrder, filters } = this.props;
    this.props.setSearchText(searchText);
    const model = {
      currentPage: 1,
      sortOrder: sortOrder,
      filters: filters,
      searchString: searchText
    }
    this.props.postListTours(model);
  }

  onPageChanged = data => {
    this.props.setCurrentPage(data);
    console.log('---data from pagination', data);
    const { sortOrder, searchText, filters } = this.props;
    const model = {
      currentPage: data,
      sortOrder: sortOrder,
      filters: filters,
      searchString: searchText
    }
    console.log('---postListTours onPageChanged----', model);
    this.props.postListTours(model);
    this.setState({ currentPage: data });

  }



  render() {
    console.log('----State Tours -----', this.state);
    console.log('----Props Tours-----', this.props);
    const { roles, isListLoading, totalPages, currentPage } = this.props;
    const { deleteDialog_isOpen, id_delete } = this.state;

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

    const toursList = (
      this.props.list.map(item => (
        <Card key={item.id} className="CardTours" >
          <Row>
            <Col sm="12" md="4">
              <Link to={`/views/${item.country}/${item.id}`}>
                <CardImg className="CardImg" src={!!item.imagePath ? serverUrl + item.imagePath : 'https://www.ittour.com.ua/images/itt_hotel_image/4/4/5/5/2/0/file_name/5.jpg'} alt="Card image cap" />
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
              <Button color="primary" className="DeleteTour" size="sm" hidden={roles !== "Admin"} onClick={e => this.deleteTour(e, item.id)}><i className="fa fa-trash" aria-hidden="true" /></Button>
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
              <FilterWidjet filters={this.props.filters} handleCheckChieldElement={this.handleCheckChieldElement} />
            </div>
            <div className="col-12 col-md-9">

              <SortToolbar onSortChanged={this.onSortChanged} onSearchChanged={this.onSearchChanged} />
              {toursList}
              <SpinnerWidget loading={isListLoading} />
              <PaginationBar totalPages={totalPages} currentPage={currentPage} pageNeighbours={1} onPageChanged={this.onPageChanged} />
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
    sortOrder: get(state, 'tours.list.sortOrder'),
    searchText: get(state, 'tours.list.searchText'),
    filters: get(state, 'tours.list.filters'),
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
    postListTours: (model) => {
      dispatch(tourAction.postListTours(model))
    },
    deleteTour: (tourId) => {
      dispatch(tourAction.deleteTour(tourId))
    },
    setTypeSort: (typeSort) => {
      dispatch(tourAction.setTypeSort(typeSort))
    },
    setSearchText: (searchText) => {
      dispatch(tourAction.setSearchText(searchText))
    },
    setCurrentPage: (currentPage) => {
      dispatch(tourAction.setCurrentPage(currentPage))
    },
    setFilters: (filters) => {
      dispatch(tourAction.setFilters(filters))
    }
  };
};

const TourWidget =
  connect(mapState, mapDispatch)(ToursContainer);

export default TourWidget;
