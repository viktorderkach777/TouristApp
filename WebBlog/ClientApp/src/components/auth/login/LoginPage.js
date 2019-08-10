import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import LoginForm from './LoginForm';
import { LinkContainer } from "react-router-bootstrap";
import Facebook from '../facebook';
import Google from '../google';

export default class LoginPage extends Component {
    render() {
        return (
            <Row className="justify-content-md-center">
                <Col md={4} offset={4}>
                    <LoginForm />
                    <div className="text-center">
                        <LinkContainer to="/forgotpassword">
                            <a>Forgot Password?</a>
                        </LinkContainer>
                    </div>
                    <br></br>
                    <div className="text-center">Don't have account?
                            <LinkContainer to="/register">
                            <a> Sign up here</a>
                        </LinkContainer>
                    </div>
                    <Facebook />
                    <Google />
                </Col>
            </Row>
        );
    }
}
