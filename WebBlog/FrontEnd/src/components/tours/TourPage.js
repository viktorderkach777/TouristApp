import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import axios from 'axios';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { serverUrl } from '../../config';
//import { Col, Row } from 'react-bootstrap';
//import axios from 'axios';
//import { LinkContainer } from "react-router-bootstrap";
import classnames from 'classnames';
//import styled from 'styled-components'
import './tours.css'
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col,
} from 'reactstrap';


export default class Hotel extends Component {
    state = {
        activeTab: '1',
        photoIndex: 0,
        isOpen: false,
        images: []
    };

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }
    componentDidMount() {
        const url = `${serverUrl}api/SampleData/Images`;
        axios.get(url)
            .then(
                result => {
                    console.log('--result--', result.data);
                    this.setState({ images: result.data });
                },
                err => {
                    console.log('--problem--', err);
                }
            );
        // axios.get('https://localhost:44318/api/Hotel/list').then(
        //     resp => {
        //         console.log('--success get--', resp.data);
        //         // const { users } = resp.data;
        //     },
        //     err => {
        //         console.log('--err problem---', err);
        //     }
        // );
    }

    onClickImage = (e, img_index) => {
        e.preventDefault();
        this.setState({ photoIndex: img_index, isOpen: true });
    }

    render() {
        const { photoIndex, isOpen, images } = this.state;
        const imageItems = images.map((item, index) => {
            return (
                <div key={item.id} className="col-lg-3 col-md-4 col-6">
                    <a href="#" className="d-block mb-4 h-100" onClick={(e) => this.onClickImage(e, index)} >
                        <img className="img-fluid img-thumbnail" src={serverUrl + item.smallImage} alt="" />
                    </a>
                </div>
            );
        });
        return (

            <Row className="justify-content-md-center">
                <div className="text-center">
                    My Hotels
            <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames('tabStyle', { active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}>
                                Описание отеля
                </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                className={classnames('tabStyle', { active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}>
                                Другие туры в отель
                </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                className={classnames('tabStyle', { active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}>
                                Календарь цен
                </NavLink>
                        </NavItem>


                        <NavItem>
                            <NavLink
                                className={classnames('tabStyle', { active: this.state.activeTab === '4' })}
                                onClick={() => { this.toggle('4'); }}>
                                Отзывы
                </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                className={classnames('tabStyle', { active: this.state.activeTab === '5' })}
                                onClick={() => { this.toggle('5'); }}>
                                Карта
                </NavLink>
                        </NavItem>
                    </Nav>



                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col xs="12" sm="6" lg="3">
                                    {isOpen && (
                                        <Lightbox
                                            mainSrc={serverUrl + images[photoIndex].bigImage}
                                            nextSrc={serverUrl + images[(photoIndex + 1) % images.length].bigImage}
                                            prevSrc={serverUrl + images[(photoIndex + images.length - 1) % images.length].bigImage}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                            onMovePrevRequest={() =>
                                                this.setState({
                                                    photoIndex: (photoIndex + images.length - 1) % images.length,
                                                })
                                            }
                                            onMoveNextRequest={() =>
                                                this.setState({
                                                    photoIndex: (photoIndex + 1) % images.length,
                                                })
                                            }
                                        />
                                    )}



                                </Col>
                            </Row>
                            <div className="row text-center text-lg-left">

                                {imageItems}

                            </div>
                        </TabPane>

                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <Card body>
                                        <CardTitle>Special Title Treatment</CardTitle>
                                        <CardText>
                                            With supporting text below as a natural lead-in to additional content.
                      </CardText>
                                        <Button>Go somewhere</Button>
                                    </Card>
                                </Col>
                                <Col sm="12">
                                    <Card body>
                                        <CardTitle>Special Title Treatment</CardTitle>
                                        <CardText>
                                            With supporting text below as a natural lead-in to additional content.
                      </CardText>
                                        <Button>Go somewhere</Button>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                    <h4>Tab 3 Contents</h4>
                                </Col>
                            </Row>
                        </TabPane>


                        <TabPane tabId="4">
                            <Row>
                                <Col sm="12">
                                    <h4>Tab 4 Contents</h4>
                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tabId="5">
                            <Row>
                                <Col sm="12">
                                    <h4>Tab 5 Contents</h4>
                                </Col>
                            </Row>
                        </TabPane>

                    </TabContent>

                </div>
            </Row>
        );
    }
}
