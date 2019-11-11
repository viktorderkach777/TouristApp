import React, { Component } from 'react';
//import Lightbox from 'react-image-lightbox';
import axios from 'axios';
import { Button, CardText, CardSubtitle, CardTitle, Card, CardBody, Col, Container, Row,NavItem, NavLink} from 'reactstrap';
//import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { serverUrl } from '../../config';
import ImageGallery from 'react-image-gallery';
//import classnames from 'classnames';
import './tours.css'



export default class Hotel extends Component {
    state = {
            tour:{}
    };

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }
    componentDidMount() {
        const url2 = `${serverUrl}api/tour/single/`+this.props.match.params.id;
        axios.get(url2)
            .then(
                result => {
                    console.log('--result--', result.data);
                   
                    this.setState({ tour: result.data });
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

    render() {
        console.log('-----Single Tour state------ ', this.state);
        console.log('-----Single Tour props------ ', this.props);
        const { tour}=this.state;

        return (
            <React.Fragment>
                <div className="app flex-row align-items-top">
                    <Container>
                        <Card className="CardTours text-center" style={{ height: 'auto', padding: '20px' }}>
                            <CardText tag="h4">
                                Зареєструйся до <b>1 жовтня</b> отримай бонус 250 гривень на оплату туру від нашого агентства!
                            </CardText>
                        </Card>
                        <Card className="CardTours">
                            <CardBody>
                                <CardTitle tag="h3">{tour.name} {tour.class}*</CardTitle>
                                <CardSubtitle><i className="fa fa-map-marker" aria-hidden="true"/> {tour.country},{tour.region}</CardSubtitle> 
                                <Row>
                                    <Col sm="5">
                                        <ImageGallery items={this.state.tour.images} showBullets={true} />
                                    </Col>
                                    <Col sm="4">
                                        <CardText>
                                            <li>
                                                <span className="skin-color hidden-xs"> Виліт:</span>
                                                <span className="date-capitalize"><b> {tour.date}</b></span>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Тур:</span>
                                                <b> {tour.daysCount} ночей</b>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Харчування:</span>
                                                <b>  без харчування</b>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Ціна за:</span>
                                                <b>   2-ох дорослих</b>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Розміщення:</span>
                                                <b>  2AD</b>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Номер:</span>
                                                <b>Standard Room</b>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Перельот туди:</span>
                                                <b>{tour.date}</b>
                                            </li>
                                            <li>
                                                <span className="skin-color hidden-xs"> Перельот назад:</span>
                                                <b>19.09</b>
                                            </li>


                                        </CardText>

                                    </Col>
                                    <Col sm="3">
                                        <CardText className="skin-color hidden-xs" tag="h3" >Найкраща ціна: </CardText>
                                        <CardText className="GreenColor" tag="h2" >{tour.price} ₴</CardText>
                                        <Button size="lg" className="buttonHotel">Потрібна консультація</Button>
                                        <Button size="lg" className="buttonHotel">Замовлення</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Row>
                                <Col sm="8">
                                    <Card className="CardTours text-center">
                                    <CardTitle  tag="h3" className="YColor"> Опис готелю</CardTitle>
                                        <CardText>
                                        Citymax Bur Dubai 3 *
Готель розташований в 5 хвилинах ходьби від бізнес-центру Вежа Берджуман і затоки Dubai Creek. Готель відкритий в 2010 році, оновлений в 2014 році. Складається з одного 8-поверхового корпусу. Затишний готель, в номерах можна відкривати вікна. На метро або таксі недалеко до центру міста Downtown, торгових центрів і Золотого ринку - все це в 10 хвилинах їзди. Рекомендуємо готель для курортного відпочинку і ділових поїздок. Готель розташований в районі Бур-Дубай, недалеко від центру міста, в 12 км від міжнародного аеропорту Дубая. До найближчої станції метро 500 м. За 5 хвилин можна дійти до бізнес-центру Вежа Берджуман і затоки Dubai Creek. Музей Дубая - в 3,3 км, Торговий центр Dubai Mall - в 7,7 км, Бурдж-Халіфа - в 7,7 км, Mercato Mall - в 10 км, Аквапарк Wild Wadi - в 18,9 км.

Розташування
Готель знаходяться в зручній доступності від місцевих жвавих ринків і базарів. За 10 хвилин можна дійти до торгового центру Burjuman, а відстань до Всесвітнього торгового центру Дубай становить 3 км.

пляж
Міський пляж Al Mamzar Beach Park (вхід платно) в 20 хвилинах їзди від готелю. Автобус до пляжу: безкоштовно (4 рази в день). На пляжі парасольки, шезлонги, матраци і, рушники: платно.

номери
У готелі 691 номер.

сервіси
Цілодобова стійка реєстрації, камера зберігання багажу, послуги консьєржа, екскурсійне бюро, факс / ксерокопіювання, Wi-Fi в лобі (безкоштовно, 24 години), room service: цілодобово (платно), торгові автомати з напоями і снеки, 3 ресторани - 1 основний ресторан: All Day Dinning (сніданок, обід, вечеря - шведський стіл), 2 ресторани a la carte: S

Спорт і розваги
Дартс платно.
                                        </CardText>
                                    </Card>
                                </Col>
                                <Col sm="4">
                              
                                    <Card className="CardTours text-center" style={{padding:'10px'}}>
                                   
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
                                    <Card className="CardTours text-center" style={{padding:'10px'}}>
                                   
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

