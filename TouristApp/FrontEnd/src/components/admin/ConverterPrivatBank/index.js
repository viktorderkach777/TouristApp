import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Label, CardHeader, FormGroup, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
//import PropTypes from 'prop-types';
import classnames from 'classnames';
import Notifications, { notify } from '../../Notifications'
//import { connect } from "react-redux";
//import * as userAction from '../../../reducers/auth';
//import get from 'lodash.get';
//import validateemail from '../../../helpers/validateEmail'; 
import { Link } from 'react-router-dom';
//import { Redirect } from "react-router";
import AdminService from '../../../Services/AdminService'

const iconsColor = {
    backgroundColor: '#00aced',
    color: '#fff',
    borderColor: '#00aced'
}

class KursForm extends Component {

    state = {
        data: [],
        currentDate: '',
        errors: {
        },
        done: false,
        isLoading: false
    };



    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    [name]: value,
                    errors
                }
            )
        }
        else {
            this.setState(
                { [name]: value })
        }
    };

    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    };


    onSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        console.log('submit');
        // if (this.state.countryName === '') errors.countryName = " Can't be empty!"
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            
            AdminService.getKurs()
                .then(res => {
                    const data = res.data;
                    this.setState({ data, done: true, isLoading: false }, () => notify(" Курси від Приватбанку отримано ", '#071'))
                })
                .catch(() => { console.log('--failed--'); });
        }
        else {
            this.setState({ errors });
        }
    };

    render() {
        const { errors, isLoading } = this.state;
        console.log('----Курси валют---', this.state);
        const form = (
            <React.Fragment>
                <Row className="justify-content-center">
                    <Col md="5">
                        <Card>
                            <CardHeader><i className="fa fa-align-justify"></i>Конвертер валют</CardHeader>
                            <CardBody>
                                <Form inline  onSubmit={this.onSubmitForm}>
                                    <FormGroup className="m-2 mr-sm-2 mb-sm-0">
                                        <Label for="grn" className="mr-sm-2">ГРН</Label>
                                        <Input type="text" name="grn" id="grn" placeholder=" " />
                                    </FormGroup>
                                    <FormGroup className="m-2 mr-sm-2 mb-sm-0">
                                        <Label for="rub" className="mr-sm-2">RUB</Label>
                                        <Label for="rub" className="mr-sm-2">0.34</Label>
                                        <Input type="text" name="rub" id="rub" placeholder=" " />
                                    </FormGroup>
                                    <FormGroup className="m-2 mr-sm-2 mb-sm-0">
                                        <Label for="usd" className="mr-sm-2">USD</Label>
                                        <Label for="usd" className="mr-sm-2">24.7</Label>
                                        <Input style={{width:'55%'}} type="text" name="usd" id="usd" placeholder=" " />
                                    </FormGroup>
                                    <FormGroup className="m-2 mr-sm-2 mb-sm-0 justify-content-left" >
                                        <Label for="eur" className="mr-sm-2">EUR</Label>
                                        <Label for="eur" className="mr-sm-2">27.01</Label>
                                        <Input style={{width:'55%'}} type="text" name="eur" id="eur" placeholder=" " />
                                    </FormGroup>
                                    <Button color ='primary' type="submit" >Submit</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
        return form;// (done ? <Redirect to='/admin/countryadd' /> : form);
    }
}

const KursWidget = KursForm;
export default KursWidget;

{/* <Notifications />
                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="6">
                                <CardGroup>
                                    <Card className="p-4">
                                        <CardBody>
                                            <Form onSubmit={this.onSubmitForm}>
                                                {/* <img src={hotelimg} style={{ height: '100px' }} alt='hotel'></img> }
                                                
                                                <h1> Курс валют</h1>
                                                <p className="text-muted">Показує курс валют</p>
                                                {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}

                                                <Label htmlFor="name">Дата:  </Label>
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend" >
                                                    <InputGroupText style={iconsColor}>
                                                    <i className="fa fa-money" aria-hidden="true"></i>
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input 
                                                    type="date"
                                                    placeholder="дата"
                                                    data-date="" 
                                                    data-date-format="DD.MMMM.YYYY"
                                                    autoComplete="currentDate"
                                                    className={classnames('form-control', { 'is-invalid': !!errors.currentDate})}
                                                    id="currentDate"
                                                    name="currentDate"
                                                    value={this.state.currentDate}
                                                    onChange={this.handleChange}
                                                    />
                                                    {!!errors.currentDate ? <span className="help-block">{errors.currentDate}</span> : ''}
                                                </InputGroup>

                                                <Row className="justify-content-center">
                                                    <Col xs="3">
                                                        <Button  type="submit" color="primary" className="px-4" disabled={isLoading}>Показати</Button>
                                                       </Col>
                                                       <Col xs="3">
                                                        <Link to={`/admin/`}>
                                                        <Button   color="danger"   className="px-4" style={{marginLeft:'10px'}} >Закрити</Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </CardBody>
                                    </Card>

                                </CardGroup>
                            </Col>
                        </Row>
                    </Container>
                </div> */}