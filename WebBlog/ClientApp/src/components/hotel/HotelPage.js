import React, { Component } from 'react';
//import { Col, Row } from 'react-bootstrap';
//import axios from 'axios';
//import { LinkContainer } from "react-router-bootstrap";
import classnames from 'classnames';
//import styled from 'styled-components'
import './hotels.css'
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

    };

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }
    componentDidMount() {

    }

    render() {
        return (

            <Row className="justify-content-md-center">
                <div className="text-center">
                 <h1>Описание отеля</h1>
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


                        <TabPane tabId="4">
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

                        <TabPane tabId="5">
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

                    </TabContent>

                </div>
            </Row>
        );
    }
}
