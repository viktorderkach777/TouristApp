import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
//import PropTypes from 'prop-types';
//import classnames from 'classnames';
//import { connect } from "react-redux";
//import * as userAction from '../../../reducers/auth';
//import get from 'lodash.get';
//import validateemail from '../../../helpers/validateEmail'; 
import { Link } from 'react-router-dom';
//import { Redirect } from "react-router";
import { notify } from '../../Notifications'
import  AdminService from '../AdminService';

const iconsColor = {
    backgroundColor: '#00aced',
    color: '#fff',
    borderColor: '#00aced'
}

class RegionAddForm extends Component {

    state = {
        countries: [
            {
              id:7,
              name:'Australia'
            }
             ],
             selectedCountry:'7',
             regions:[],
             regionsLoad:false,
             selectedRegion:'7',
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

    getRegion=(id)=>{
        AdminService.getRegiones(id)
        .then(res => {
          const regions = res.data;
          this.setState({ regions, regionsLoad:true });
        })
      .catch(() => {console.log('--failed--'); });
    }

    handleChangeSelect = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
        console.log('--region id--', e.target.value);
        this.getRegion(e.target.value);
      };

    onSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        console.log('submit');

        if (this.state.selectedCountry === '') errors.selectedCountry = " Can't be empty!"
        if (this.state.selectedRegion === '') errors.selectedRegion = " Can't be empty!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { selectedCountry, selectedRegion } = this.state;
             this.setState({ isLoading: true });
              console.log('RegionAdd: validform', selectedRegion);
         
            AdminService.deleteRegion(selectedRegion)
                .then(
                    () => { this.setState({ done: true, isLoading: false },() => 
                    {
                        notify(" Регіон видалено!" , '#071') 
                        this.getRegion(selectedCountry);
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
        const {regions, regionsLoad,countries, errors, isLoading } = this.state;
        console.log('----AddHotel---', this.state);
        const form = (
            <React.Fragment>
                 {/* <Notifications /> */}
                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="6">
                                <CardGroup>
                                    <Card className="p-4">
                                        <CardBody>
                                            <Form onSubmit={this.onSubmitForm}>
                                                <h1> Видалити регіон країни</h1>
                                                <p className="text-muted">Видалити вибраний регіон</p>
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
                                                        onChange={this.handleChangeSelect}>
                                                        {countries.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
                                                    </Input>
                                                </InputGroup>

                                                <InputGroup  className="mb-3 " hidden={!regionsLoad} >
                  <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                          <i className="fa fa-map-marker" aria-hidden="true"></i>
                          </InputGroupText>
                   </InputGroupAddon>
                              <Input type="select"
                              name="selectedRegion"
                              id="selectedRegion" 
                              value={this.state.selectedRegion}
                              onChange={this.handleChange}>
                          {regions.map(item => <option  key={item.id} value={item.id} >{item.name}</option>)} 
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