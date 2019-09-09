import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
//import PropTypes from 'prop-types';
import classnames from 'classnames';
//import { connect } from "react-redux";
//import * as userAction from '../../../reducers/auth';
//import get from 'lodash.get';
//import validateemail from '../../../helpers/validateEmail'; 
import { Link } from 'react-router-dom';
import { Redirect } from "react-router";
import axios from 'axios';
import { serverUrl } from '../../../config';

const iconsColor = {
    backgroundColor: '#00aced',
    color: '#fff',
    borderColor: '#00aced'
}

class RegionAddForm extends Component {

    state = {
        regionName: '',
        countries: [
            {
                id: 7,
                name: 'Australia'
            }
        ],
        selectedCountry: '7',
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



    componentDidMount() {
        console.log('---componentDiDMount----');
        axios.get(`${serverUrl}api/Hotel/countries`)
            .then(res => {
                const countries = res.data;
                this.setState({ countries });
            })
            .catch(() => { console.log('--failed--'); });
    }

    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    };


    onSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        console.log('submit');

        if (this.state.selectedCountry === '') errors.selectedCountry = " Can't be empty!"
        if (this.state.regionName === '') errors.regionName = " Can't be empty!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { selectedCountry, regionName } = this.state;
            
            this.setState({ isLoading: true });
            const model = {
                id: selectedCountry,
                name: regionName
            };
            console.log('RegionAdd: validform', model);
                axios.post(`${serverUrl}api/Hotel/regions/create`, model)
                .then(
                    () => { this.setState({ done: true }) },
                    (err) => this.setState({ errors: err.response.data, isLoading: false })
                )
                .catch(() => { console.log('--failed--'); });
        }
        else {
            this.setState({ errors });
        }
    };

    render() {
        const { countries, errors, isLoading, done } = this.state;
        console.log('----AddHotel---', this.state);
        const form = (
            <React.Fragment>
                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="6">
                                <CardGroup>
                                    <Card className="p-4">
                                        <CardBody>
                                            <Form onSubmit={this.onSubmitForm}>
                                                {/* <img src={hotelimg} style={{ height: '100px' }} alt='hotel'></img> */}
                                                <h1> Додати регіон країни</h1>
                                                <p className="text-muted">Додайте новий регіон</p>
                                                {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}

                                                <InputGroup className="mb-3" >
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText style={iconsColor}>
                                                            <i className="fa fa-globe" aria-hidden="true"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="select"
                                                        name="selectedCountry"
                                                        id="selectedCountry"
                                                        value={this.state.selectedCountry}
                                                        onChange={this.handleChange}>
                                                        {countries.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
                                                    </Input>
                                                </InputGroup>


                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText style={iconsColor}>
                                                            <i className="fa fa-bed" aria-hidden="true"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        type="text"
                                                        placeholder="назва регіону"
                                                        // autoComplete="regionName"
                                                        className={classnames('form-control', { 'is-invalid': !!errors.regionName })}
                                                        id="regionName"
                                                        name="regionName"
                                                        value={this.state.regionName}
                                                        onChange={this.handleChange}
                                                    />
                                                    {!!errors.regionName ? <span className="help-block">{errors.regionName}</span> : ''}
                                                </InputGroup>
                                                <Row className="justify-content-center">
                                                    <Col xs="3">
                                                        <Button  type="submit" color="primary" className="px-4" disabled={isLoading}>Додати</Button>
                                                    </Col>
                                                    <Col xs="3">
                                                        <Link to={`/admin/`}>
                                                        <Button   color="danger" className="px-4" style={{marginLeft:'10px'}} >Закрити</Button>
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
        return (done ? <Redirect to='/admin/' /> : form);
    }
}

// HotelAddForm.propTypes =
//     {
//         login: PropTypes.func.isRequired,
//         history: PropTypes.object.isRequired,
//         auth: PropTypes.object.isRequired
//     }

// const mapState = state => {
//     return {
//         auth: get(state, 'auth'),
//     };
// };

// const mapDispatch = dispatch => {
//     return {
//         login: (model) =>
//             dispatch(userAction.login(model))

//     };
// };
//const HotelAdd = connect(mapState, mapDispatch)(HotelAddForm);
const RegionAdd = RegionAddForm;
export default RegionAdd;