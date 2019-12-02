import React, { Component } from 'react';
//import Lightbox from 'react-image-lightbox';
import axios from 'axios';
import { Button, CardText, CardSubtitle, CardTitle, Card, CardBody, Col, Container, Row, NavItem, NavLink } from 'reactstrap';
//import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { serverUrl } from '../../config';
import ImageGallery from 'react-image-gallery';
import Moment from 'moment';
import * as kursAction from '../../components/admin/converterPrivatBank/reducer'
import { connect } from 'react-redux'
//import classnames from 'classnames';
import './tours.css'
import CentralPageSpinner from '../CentrPageSpinner';
const TabWidjet = React.lazy(() => import('../tours/Tabs'));


class Hotel extends Component {
    state = {
        tour: {}
    };

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    componentDidMount() {
        const url2 = `${serverUrl}api/tour/single/` + this.props.match.params.id;
        axios.get(url2)
            .then(
                result => {
                    //console.log('--result--', result.data);
                    let z = { ...result.data }
                    this.setState({ tour: z });
                },
                err => {
                    //console.log('--problem--', err);
                }
            );
    }

    onClickImage = (e, img_index) => {
        e.preventDefault();
        this.setState({ photoIndex: img_index, isOpen: true });
    }

    setPrice = (price, currency, kurs, isListLoading, errors) => {
        let newPrice = price;

        if (errors && errors.length > 0) {
            return <><span className="mr-4">"Помилка!"</span></>;
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
        if (isNaN(newPrice)) {
            return <CentralPageSpinner loading={true} />
        }
        return <><span className="mr-4">{newPrice} {currency}</span></>;
    }

    render() {
        // console.log('-----Single Tour state------ ', this.state);
        // console.log('-----Single Tour props------ ', this.props);
        const { tour } = this.state;
        const { currency, kurs, isKursLoading, errors } = this.props;
        if (isKursLoading) {
            return <CentralPageSpinner loading={isKursLoading} />
        }
        let param = tour.hotelParametries;
        //console.log('-----tour------ ', param);


        return (
            <React.Fragment>
                <div className="app flex-row align-items-top">
                    <Container>
                        <Card className="CardTours text-center" style={{ height: 'auto', padding: '20px' }}>
                            <CardText tag="h4">
                                Зареєструйся до <b>{Moment().add(30, 'days').format('DD/MM/YY')}</b> і отримай бонус 250 гривень на оплату туру від нашого агентства!
                            </CardText>
                        </Card>
                        <Card className="CardTours">
                            <CardBody>
                                <CardTitle tag="h3">{tour.name} {tour.class}*</CardTitle>
                                <CardSubtitle><i className="fa fa-map-marker" aria-hidden="true" /> {tour.country}, {tour.region}</CardSubtitle>
                                <Row>
                                    <Col sm="5">
                                        <ImageGallery items={this.state.tour.images} showBullets={true} />
                                    </Col>
                                    <Col sm="4">
                                        <CardText>
                                            <li>
                                                <span className="skin-color hidden-xs"> Харчування: </span>
                                                <b>  {tour.hotelFood}</b>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Ціна за: </span>
                                                <b>   2-ох дорослих</b>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Розміщення: </span>
                                                <b>  2AD</b>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Номер: </span>
                                                <b>Standard Room</b>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Переліт туди: </span>
                                                <b>{Moment(tour.date).format('DD/MM/YYYY')}</b>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Переліт назад: </span>
                                                <b>{Moment(tour.date).add(tour.daysCount, 'days').format('DD/MM/YYYY')}</b>
                                            </li>
                                        </CardText>
                                    </Col>
                                    <Col sm="3">
                                        <CardText className="skin-color hidden-xs" tag="h3" >Найкраща ціна: </CardText>
                                        <CardText className="GreenColor" tag="h2" >{this.setPrice(tour.price, currency, kurs, isKursLoading, errors)}</CardText>
                                        <Button size="lg" className="buttonHotel">Потрібна консультація</Button>
                                        <Button size="lg" className="buttonHotel">Замовлення</Button>
                                        {/* <CardText className="skin-color hidden-xs" tag="h3" >{errors}</CardText> */}
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Row>
                            <Col sm="8">
                                <Card className="CardTours text-center">

                                    {/* {this.state.tour.rate} */}
                                    <TabWidjet tour={this.state.tour} param={param} />
                                    {/* {this.state.tour.images.map(item =>
                                            <span> <b>{item.id}</b> </span> )} */}

                                </Card>

                            </Col>
                            <Col sm="4">

                                <Card className="CardTours text-center" style={{ padding: '10px' }}>

                                    <CardText tag="h3" className="YColor">
                                        Потрібна консультація експерта?
                                        </CardText>
                                    <CardText tag="h5">
                                        Ми будемо раді допомогти Вам підібрати хороший відпочинок за найнижчими цінами!
                                        </CardText>
                                    <CardText tag="h5" className="BlueColor">
                                        <NavItem>
                                            <NavLink href="+380950173999">
                                                <i className="fa fa-phone YColor" aria-hidden="true"></i>
                                                +38 (095) 01 73 999
                                                </NavLink>
                                        </NavItem>
                                    </CardText>
                                    <CardText tag="h5" className="BlueColor">
                                        <NavItem>
                                            <NavLink href="+3809501375888">
                                                <i className="fa fa-phone YColor" aria-hidden="true"></i>
                                                +38 (095) 13 75 888
                                                </NavLink>
                                        </NavItem>
                                    </CardText>
                                    <CardText tag="h5">TouristApp@gmail.com</CardText>
                                </Card>
                                <Card className="CardTours text-center" style={{ padding: '10px' }}>

                                    <CardText tag="h3" className="YColor">Замовляйте з нами!</CardText>
                                    <CardText tag="h5" className="BlueColor"><b><i className="fa fa-university   fa-2x YColor" aria-hidden="true"></i> Більш 15000 готелів</b></CardText>
                                    <CardText tag="h5">Готелі з перевіркою якості.</CardText>

                                    <CardText tag="h5" className="BlueColor"><b><i className="fa fa-money  fa-2x YColor" aria-hidden="true"></i> Економія часу і грошей</b></CardText>
                                    <CardText tag="h5">Найнижчі ціни та он-лайн бронювання.</CardText>

                                    <CardText tag="h5" className="BlueColor"><b><i className="fa fa-users fa-2x YColor" aria-hidden="true" ></i> Команда консультантів</b></CardText>
                                    <CardText tag="h5">Ми працюємо на Вас. І це нам подобається.</CardText>

                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapState = state => {
    return {
        isKursLoading: state.kurs.loading,
        currency: state.kurs.currency,
        kurs: state.kurs.kurs,
        errors: state.kurs.errors
    };
};

const mapDispatch = (dispatch) => {
    return {
        setCurrency: (name) => {
            dispatch(kursAction.setCurrency(name))
        },
        kursGet: () =>
            dispatch(kursAction.kursGet()),
    };
};

export default connect(mapState, mapDispatch)(Hotel)