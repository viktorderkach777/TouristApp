import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

export default class RegisterPage extends Component {
    state = {}
    render() {
        return (
            <Row className="justify-content-md-center">
                <Col md={4} offset={4}>
                    
                        <RegisterForm />
                        <br></br>
                        <div className="text-center">Already have an account?
                            <LinkContainer to="/login">
                                <a> Login here</a>
                            </LinkContainer>
                        </div>
                </Col>
            </Row>
        );
    }
}

