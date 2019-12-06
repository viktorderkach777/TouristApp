import React, { Component } from 'react';
import { connect } from 'react-redux'
import get from 'lodash.get';
import { Link } from 'react-router-dom';
import './tours.css';
import * as tourAction from '../../reducers/tourReducer';
import * as filtersAction from '../../reducers/filterReducer';
import Moment from 'moment';
import * as kursAction from '../admin/converterPrivatBank/reducer'
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
const SpinnerWidget = React.lazy(() => import('../CentrPageSpinner'));
const SortToolbar = React.lazy(() => import('../SortToolbar'));
const PaginationBar = React.lazy(() => import('../Pagination'));
const FilterWidjet = React.lazy(() => import('../filters'));
const ChatBtn = React.lazy(() => import('../chatButton'));
const ChatRoom = React.lazy(() => import('../chatRoom'));

class ToursContainer extends Component {
    constructor(props) {
        super(props);

        //initializing state 
        this.state = {
            tours: [],
            filtersIdList: [],
            currentPage: 1,
            totalPages: null,
            sortOrder: 'name',
            filters: null,
            searchText: '',
            deleteDialog_isOpen: false,
            id_delete: 0,
            chatDialog_isOpen: false,
            name: ''
        };
    }

    componentDidMount() {
        //console.log('--tours-componentDidMount---');
        const { currentPage, filtersIdList, totalPages, sortOrder, searchText, kursGet } = this.props;
        const model = {
            currentPage: 1,
            sortOrder: sortOrder,
            filters: filtersIdList,
            searchString: searchText
        }
        if (filtersIdList.length === 0) {
            this.props.getListFilters();
        }

        this.props.postListTours(model);
        this.setState({
            currentPage: currentPage,
            totalPages: totalPages,
            sortOrder: sortOrder,
            filtersIdList: filtersIdList
        });
        kursGet();
    }

    static getDerivedStateFromProps = (props, state) => {
        //console.log('--tours-getDerivedStateFromProps---');
        return {
            tours: props.list,
            currentPage: props.currentPage,
            totalPages: props.totalPages,
            sortOrder: props.sortOrder,
            searchText: props.searchText,
            filtersIdList: props.filtersIdList,
            countTours: props.countTours,
            errors: props.errors,
            currency: props.currency,
            kurs: props.kurs,
            setCurrency: props.setCurrency,
            isListLoading: props.isListLoading
        };
    }


    componentDidUpdate(prevProps) {

        if (this.props.sortOrder !== prevProps.sortOrder ||
            this.props.currentPage !== prevProps.currentPage ||
            this.props.searchText !== prevProps.searchText ||
            this.props.filtersIdList !== prevProps.filtersIdList
        ) {
            const model = {
                currentPage: this.props.currentPage,
                sortOrder: this.props.sortOrder,
                filters: this.props.filtersIdList,
                searchString: this.props.searchText
            }

            this.postListTours(model);
        }
    }

    deleteTour = (e, id) => {

        this.toggleDialogDelete();
        this.setState({ id_delete: id });
        //console.log('delete tour with:', id);

    }

    toggleDialogDelete = () => {
        this.setState({
            deleteDialog_isOpen: !this.state.deleteDialog_isOpen
        });
    }

    toggleChatDialog = () => {
        //console.log('toggleChatDialog: ', this.props);
        this.setState({
            chatDialog_isOpen: !this.state.chatDialog_isOpen
        });
    }

    onClickRemoveImageYes = () => {
        const { id_delete } = this.state;
        this.props.deleteTour(id_delete);
        this.toggleDialogDelete();
    }

    postListTours = () => {

        const { searchText, sortOrder, filtersIdList, currentPage } = this.state;
        const model = {
            currentPage: currentPage,
            sortOrder: sortOrder,
            filters: filtersIdList,
            searchString: searchText
        }

        //console.log('---componentDidUpdate---- ', model);
        this.props.postListTours(model);
    }


    onSortChanged = (data) => {
        //console.log('---sort Type ---- ', data);
        this.props.setTypeSort(data);
    }

    handleCheckChieldElement = (filterId) => {
        //console.log('---filterId enter---', filterId)
        this.props.setFilterId(filterId);
    }

    onSearchChanged = (searchText) => {
        //console.log('---Search text ---- ', searchText);
        this.props.setSearchText(searchText);
    }

    onPageChanged = (data) => {
        //console.log('---data from pagination', data);
        this.props.setCurrentPage(data);
    }

    //currency, kurs,
    setPrice = (price, currency, kurs, isListLoading, errors) => {
        let newPrice = price;
        if (errors && errors.length > 0) {
            return <><p className="mr-4">"Помилка!"</p></>;
        }

        if (!isListLoading && kurs && kurs.length === 4) {
            const usdSale = parseFloat(kurs[0].sale);
            const eurSale = parseFloat(kurs[1].sale);
            const rurSale = parseFloat(kurs[2].sale);

            switch (currency) {
                case 'UAH':
                    newPrice = (price * usdSale).toFixed(0)
                    break;
                case 'RUB':
                    newPrice = (price * usdSale / rurSale).toFixed(0)
                    break;
                case 'EUR':
                    newPrice = (price * eurSale / usdSale).toFixed(1)
                    break;
                default:
                    break;
            }
        };
        //console.log('---currency', currency);
        return <><h5 className="mr-4">{newPrice} {currency === undefined ? "USD" : currency}</h5></>;
    }


    render() {
        // console.log('----State Tours -----', this.state);
        // console.log('----Props Tours-----', this.props);
        const { roles, totalPages, currentPage, countTours } = this.props;
        const { deleteDialog_isOpen, chatDialog_isOpen, id_delete, currency, kurs, isListLoading, errors } = this.state;

        //   if (isListLoading) {
        //     return <SpinnerWidget loading={isListLoading} />
        // }

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
                            <Link to={`/tours/${item.country}/${item.normalizedName}/${item.id}`}>
                                <CardImg left="true" height="100%" className="CardImg p-2" src={!!item.imagePath ? serverUrl + item.imagePath : ''} alt="Card image cap" />
                                <div className="discount">
                                    <span className="discount-title">
                                        знижка 15%
                  </span>
                                </div>
                            </Link>
                            <CardLink href="#">
                                <div className="Heart">
                                    <i className="fa  fa-heart" aria-hidden="true"></i>
                                </div>
                            </CardLink>
                        </Col>

                        <Col sm="12" md="6">
                            <CardBody>
                                <CardTitle className="CardTitle">
                                    {item.name} {item.class}*
      </CardTitle>
                                <CardSubtitle className="CardSubTitle">
                                    <small> <i className="fa fa-map-marker" aria-hidden="true"></i> {item.country}, {item.region}</small>
                                </CardSubtitle>

                                <CardText>

                                    <li>
                                        <i className="fa fa-plane iconColor" aria-hidden="true"></i>
                                        <span className="skin-color hidden-xs"> Виліт: </span>
                                        {item.сityDeparture}, <span className="date-capitalize">{Moment(item.date).format('DD/MM/YYYY')}</span>
                                    </li>
                                    <li>
                                        <i className="fa fa-calendar iconColor" aria-hidden="true"></i>
                                        <span className="skin-color hidden-xs"> Тривалість: </span>
                                        <b>{item.daysCount}</b> ночей
                                    </li>
                                    <li>
                                        {/* <i className="fa fa-bus iconColor" aria-hidden="true"></i> */}
                                        {/* <span className="skin-color hidden-xs"> Проїзд: </span> */}
                                        {/* включений */}
                                        <i className="fa fa-coffee iconColor" aria-hidden="true"></i>
                                        <span className="skin-color hidden-xs"> Харчування: </span>
                                        {item.hotelFood}
                                    </li>
                                    <li>
                                        <i className="fa fa-credit-card iconColor" aria-hidden="true"></i>
                                        <span className="skin-color hidden-xs"> Ціна за: </span>
                                        2-ох дорослих
                                    </li>
                                </CardText>
                            </CardBody>

                        </Col>
                        <Col sm="12" md="2" className="d-flex  justify-content-center align-items-center">
                            <Row>
                                {isListLoading ? null : this.setPrice(item.price, currency, kurs, isListLoading, errors)}
                                {/* ₴ */}
                                <Link to={`/tours/${item.country}/${item.normalizedName}/${item.id}`}>
                                    <Button className="buttonHotel">Дивитись тур</Button>
                                </Link>
                            </Row>
                            <Button color="primary" className="DeleteTour" size="sm" hidden={roles !== "Admin"} onClick={e => this.deleteTour(e, item.id)}><i className="fa fa-trash" aria-hidden="true" /></Button>
                        </Col>
                    </Row>
                </Card>
            )));

        return (
            <React.Fragment>
                <ChatBtn toggleChatDialog={this.toggleChatDialog} />
                <div className="container">
                    <div className="row">
                        {deleteDialogContent}
                        {chatDialog_isOpen && <ChatRoom name={this.props.name} />}
                        <div className="col-12 col-md-3">
                            <FilterWidjet setCurrency={this.props.setCurrency} filters={this.props.filters} count={countTours} handleCheckChieldElement={this.handleCheckChieldElement} />
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
        isListLoading: get(state, 'tours.list.loading') || get(state, 'kurs.loading'),
        isListError: get(state, 'tours.list.error'),
        currentPage: get(state, 'tours.list.currentPage'),
        sortOrder: get(state, 'tours.list.sortOrder'),
        searchText: get(state, 'tours.list.searchText'),
        filters: get(state, 'filters.list.filters'),
        filtersIdList: get(state, 'tours.list.filters'),
        totalPages: get(state, 'tours.list.totalPages'),
        countTours: get(state, 'tours.list.countItem'),
        isAuthenticated: get(state, 'login.isAuthenticated'),
        roles: get(state, 'login.user.roles'),
        name: get(state, 'login.user.name'),
        errors: get(state, 'kurs.errors'),
        currency: get(state, 'kurs.currency'),
        kurs: get(state, 'kurs.kurs')
    };
};

const mapDispatch = (dispatch) => {
    return {
        postListTours: (model) => {
            dispatch(tourAction.postListTours(model))
        },
        getListFilters: () => {
            dispatch(filtersAction.getListFilters())
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
        setFilterId: (filterId) => {
            dispatch(tourAction.setFilterId(filterId))
        },
        setCurrency: (name) => {
            dispatch(kursAction.setCurrency(name))
        },
        kursGet: () =>
            dispatch(kursAction.kursGet()),
    };
};

export default connect(mapState, mapDispatch)(ToursContainer);