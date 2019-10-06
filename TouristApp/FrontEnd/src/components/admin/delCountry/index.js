import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form,  Row, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

import  AdminService from '../AdminService'
import { notify } from '../../Notifications'
import Select from 'react-select';

class CountryDelForm extends Component {

    state = {
        countries: [],
        selectedCountry: null,
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

    handleChangeSelect = selectedCountry => {
        this.setState({ selectedCountry });
        if (!!this.state.errors["selectedCountry"]) {
          //console.log('Errors',name);
          let errors = Object.assign({}, this.state.errors);
          delete errors["selectedCountry"];
          this.setState({ errors });
        }
      };

    onSubmitForm = (e) => {
        e.preventDefault();
        const { selectedCountry } = this.state;
        let errors = {};
        console.log('submit');

        
        if (selectedCountry === null) errors.selectedCountry = "Виберіть країну";

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { selectedCountry } = this.state;
            
            this.setState({ isLoading: true });
            console.log('CountryDelete: validform', selectedCountry.value);
                AdminService.deleteCountry(selectedCountry.value)
                .then(
                    () => { this.setState({ done: true, isLoading: false },() => 
                    {
                        notify(" Країну видалено!" , '#071') 
                        this.getCountry();
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
        const {selectedCountry, countries, errors, isLoading} = this.state;
        console.log('----Del Hotel---', this.state);
        const form = (
            <React.Fragment>
                
                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="6" xs="12">
                               
                                    <Card >
                                        <CardBody>
                                            <Form onSubmit={this.onSubmitForm}>
                                                {/* <img src={hotelimg} style={{ height: '100px' }} alt='hotel'></img> */}
                                                <h1>  Видалення країни</h1>
                                                <p className="text-muted">Видаліть вибрану країну</p>
                                                {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}

                                                {/* <div className="react-select-container">
                                                    <InputGroup  >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText style={iconsColor}>
                                                                <i className="fa fa-globe" aria-hidden="true"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Select 
                                                            
                                                            value={selectedCountry}
                                                            onChange={this.handleChangeSelect}
                                                            options={countries}
                                                        />
                                                    {!!errors.selectedOption ?
                                                            <div className="invalid-feedback d-block">
                                                                {errors.selectedOption}
                                                            </div> : ''}          
                                                    </InputGroup>
                                                </div> */}

                                                <div className="form-group" >
                                                    <label htmlFor="priority" className="">Країна</label>

                                                        <Select
                                                       value={selectedCountry}
                                                       onChange={this.handleChangeSelect}
                                                       options={countries}
                                                        />
                                                        {!!errors.selectedCountry ? <Alert color="danger">{errors.selectedCountry}</Alert> : ''}


                                                    </div>          


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