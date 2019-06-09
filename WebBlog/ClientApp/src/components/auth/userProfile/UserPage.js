import React, { Component } from 'react';
import ChangePasswordPage from "../ChangePasswordPage"
import { Card, Row, Col } from "react-bootstrap";
import UserProfileForm from './UserProfileForm';
import './UserPage.css'

class UserPage extends Component {

    render() {
        return (
            <Card>
            <Row className="justify-content-md-center">
              
                <Col md={8} offset={1}>
                    <Col md={6}>
                        <UserProfileForm/>
                    </Col>
                    <Col md={6}>
                         
                        <ChangePasswordPage/>
                    </Col>
                </Col>
               
            </Row>
            
            <br />   
            </Card>
        );
    }
}

export default (UserPage);