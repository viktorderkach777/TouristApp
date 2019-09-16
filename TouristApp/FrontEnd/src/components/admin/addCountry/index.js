import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
//import PropTypes from 'prop-types';
import classnames from 'classnames';
import Notifications, { notify } from '../../Notifications'
//import { connect } from "react-redux";
//import * as userAction from '../../../reducers/auth';
//import get from 'lodash.get';
//import validateemail from '../../../helpers/validateEmail'; 
import { Link } from 'react-router-dom';
//import { Redirect } from "react-router";
import  AdminService from '../AdminService'

const iconsColor = {
    backgroundColor: '#00aced',
    color: '#fff',
    borderColor: '#00aced'
}

class CountryAddForm extends Component {

    state = {
        countryName: '',
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
        if (this.state.countryName === '') errors.countryName = " Can't be empty!"
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { countryName } = this.state;
                    this.setState({ isLoading: true });
                    const model = {
                        name: countryName
                    };
                console.log('CountryAdd: validform', model );
                AdminService.addCountry(model)
                .then(
                    () => { this.setState({ done: true, isLoading: false},() => notify("Додано країну з назвою: "+ countryName, '#071'))},
                    (err) => this.setState({ errors: err.response.data, isLoading: false })
                )
                .catch(() => { console.log('--failed--'); });
        }
        else {
            this.setState({ errors });
        }
    };

    render() {
        const { errors, isLoading  } = this.state;
        console.log('----AddCountry---', this.state);
        const form = (
            <React.Fragment>
                <Notifications />
                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="6">
                                <CardGroup>
                                    <Card className="p-4">
                                        <CardBody>
                                            <Form onSubmit={this.onSubmitForm}>
                                                {/* <img src={hotelimg} style={{ height: '100px' }} alt='hotel'></img> */}
                                                
                                                <h1> Додати країну</h1>
                                                <p className="text-muted">Додайте нову країну</p>
                                                {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}

                                            
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText style={iconsColor}>
                                                        <i className="fa fa-globe" aria-hidden="true"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type="text"
                                                        placeholder="назва країни"
                                                        className={classnames('form-control', { 'is-invalid': !!errors.countryName })}
                                                        id="countryName"
                                                        name="countryName"
                                                        value={this.state.countryName}
                                                        onChange={this.handleChange}
                                                    />
                                                    {!!errors.countryName ? <span className="help-block">{errors.countryName}</span> : ''}
                                                    
                                                </InputGroup>
                                                <Row className="justify-content-center">
                                                    <Col xs="3">
                                                        <Button  type="submit" color="primary" className="px-4" disabled={isLoading}>Додати</Button>
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
                </div>
            </React.Fragment>
        );
        return form;// (done ? <Redirect to='/admin/countryadd' /> : form);
    }
}

const CountryAdd = CountryAddForm;
export default CountryAdd;