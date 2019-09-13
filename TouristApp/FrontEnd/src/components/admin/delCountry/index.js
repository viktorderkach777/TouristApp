import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
//import { Redirect } from "react-router";
import  AdminService from '../AdminService'
import Notifications, { notify } from '../../Notifications'

const iconsColor = {
    backgroundColor: '#00aced',
    color: '#fff',
    borderColor: '#00aced'
}

class CountryDelForm extends Component {

    state = {
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


    getCountry=()=>{
        AdminService.getCountries()
        .then(res => {
            const countries = res.data;
            this.setState({ countries });
        })
        .catch(() => { console.log('--failed--'); });
    }


    componentDidMount() {
        console.log('---componentDiDMount----');
        this.getCountry();
    }

    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    };


    onSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        console.log('submit');

        if (this.state.selectedCountry === '') errors.selectedCountry = " Can't be empty!"
        

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { selectedCountry } = this.state;
            
            this.setState({ isLoading: true });
            console.log('CountryDelete: validform', selectedCountry);
                AdminService.deleteCountry(selectedCountry)
                .then(
                    () => { this.setState({ done: true, isLoading: false },() => 
                    {
                        notify(" Країну видалено!" , '#071');
                        this.GetCounries();
                    }
                    )},
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
        console.log('----Del Hotel---', this.state);
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
                                                <h1>  Видалення країни</h1>
                                                <p className="text-muted">Видаліть вибрану країну</p>
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
                                                
                                                <Row className="justify-content-center">
                                                    <Col xs="3">
                                                        <Button  type="submit" color="primary" className="px-4" disabled={isLoading}>Видалити</Button>
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
        return form;//(done ? <Redirect to='/admin/' /> : form);
    }
}

const CountryDel = CountryDelForm;
export default CountryDel;