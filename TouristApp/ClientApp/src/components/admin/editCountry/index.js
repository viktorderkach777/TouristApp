import React, { Component } from 'react';
import { Label,Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import  AdminService from '../AdminService'
import { notify } from '../../Notifications'

const iconsColor = {
    backgroundColor: '#00aced',
    color: '#fff',
    borderColor: '#00aced'
}

class CountryEditForm extends Component {

    state = {
        countryName: '',
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
        AdminService.getCountries()
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
        if (this.state.countryName === '') errors.countryName = " Can't be empty!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { selectedCountry, countryName } = this.state;
            
            this.setState({ isLoading: true });
            const model = {
                 name: countryName
            };
            console.log('EditCountryAdd: validform', model);
            AdminService.editCountry(selectedCountry,model)  
                .then(
                    () => { this.setState({ done: true, isLoading: false,regionName:''},
                        () =>notify("Назву країни змінено! ", '#071'))},
                    (err) => this.setState({ errors: err.response.data, isLoading: false })
                )
                .catch(() => { console.log('--failed--'); });
        }
        else {
            this.setState({ errors });
        }
    };

    render() {
        const { countries, errors, isLoading} = this.state;
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
                                                <h1> Редагувати країну</h1>
                                                <p className="text-muted">Відредагуйте назву країни</p>
                                                {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}
                                                <Label htmlFor="name">Назва країни</Label>
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
                                                        placeholder="нова назва країни"
                                                        // autoComplete="regionName"
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
                                                        <Button  type="submit" color="primary" className="px-4" disabled={isLoading}>Редагувати</Button>
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
        return form; //(done ? <Redirect to='/admin/' /> : form);
    }
}


const CountryEdit = CountryEditForm;
export default CountryEdit;