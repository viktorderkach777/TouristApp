import React, { Component } from 'react';
//import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
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
        axios.get('https://localhost:44318/api/Hotel/list').then(
            resp => {
                console.log('--success get--', resp.data);
                // const { users } = resp.data;
            },
            err => {
                console.log('--err problem---', err);
            }
        );
    }

    render() {
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
                                <Col sm="12">
                                    <h4>Tab 1 Contents</h4>

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
