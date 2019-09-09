import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from "react-redux";
import * as userAction from '../../../reducers/auth';
import get from 'lodash.get';
//import validateemail from '../../../helpers/validateEmail'; 
import { Redirect } from "react-router";
import axios from 'axios';
import { serverUrl } from '../../../config';
import hotelimg from '../addHotel/hotel.png';
const iconsColor = {
  backgroundColor: '#00aced',
  color: '#fff',
  borderColor: '#00aced'
}

class HotelAddForm extends Component {
  

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
         classes:['2','3','4','5'],
         selectedClass:'2',
      hotelname: '',
      description:'',
      price: '',
      profileUrl:'',
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
     .catch(() => {console.log('--failed--'); });
    }

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);
  };
  handleChangeSelect = (e) => {
  
    this.setStateByErrors(e.target.name, e.target.value);
    console.log('--region id--', e.target.value);
    axios.get(`${serverUrl}api/Hotel/regions/`+e.target.value)
    .then(res => {
      const regions = res.data;
      this.setState({ regions, regionsLoad:true });
     
    })
   .catch(() => {console.log('--failed--'); });
  };


  onSubmitForm = (e) => {
    e.preventDefault();
    let errors = {};
    console.log('submit');
    //if (!validateemail(this.state.email)) errors.email = "Enter valid email"
    if (this.state.email === '') errors.email = "Can't be empty!"
    if (this.state.password === '') errors.password = "Can't be empty!"

    const isValid = Object.keys(errors).length === 0
    if (isValid)
    {
      const { email, password } = this.state;
      console.log('validform',email, password);
      this.setState({ isLoading: true });
      console.log('----login---', this.props);
      this.props.login({ Email: email, Password: password })
        .then(
          () =>{this.setState({ done: true })},
          (err) => this.setState({ errors: err.response.data, isLoading: false })
        );
    }
    else 
    {
      this.setState({ errors });
    }
  };

  render() {
    const {classes, regions, regionsLoad, countries,errors, isLoading, done } = this.state;
    console.log('----AddHotel---', this.state);
    const form = (
      <React.Fragment>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmitForm}>
                      
                      <h1><img src={hotelimg} style={{height:'100px'}} alt='hotel'></img> Додати готель</h1>
                      <p className="text-muted">Додайте новий готель</p>
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
                          {countries.map(item => <option  key={item.id} value={item.id} >{item.name}</option>)} 
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

                  
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                          <i className="fa fa-bed" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="text"
                          placeholder="назва готелю"
                          autoComplete="hotelname"
                          className={classnames('form-control', { 'is-invalid': !!errors.hotelname})}
                          id="hotelname"
                          name="hotelname"
                          value={this.state.hotelname}
                          onChange={this.handleChange}
                          />
                          {!!errors.hotelname ? <span className="help-block">{errors.hotelname}</span> : ''}
                      </InputGroup>

                      <InputGroup  className="mb-3 " >
                      <InputGroupAddon addonType="prepend">
                              <InputGroupText style={iconsColor}>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              </InputGroupText>
                      </InputGroupAddon>
                                  <Input type="select"
                                  name="selectedClass"
                                  id="selectedClass" 
                                  value={this.state.selectedClass}
                                  onChange={this.handleChange}>
                              {classes.map(item => <option  key={item} value={item} >{item}*</option>)} 
                                </Input>
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="textarea"
                          placeholder="Опис готелю"
                          autoComplete="Опис"
                          style={{height:'100px'}}
                          className={classnames('form-control', { 'is-invalid': !!errors.description})}
                          id="description"
                          name="description"
                          value={this.state.description}
                          onChange={this.handleChange}
                          />
                          {!!errors.password ? <span className="help-block"> {errors.description}</span> : ''}
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend" >
                          <InputGroupText style={iconsColor}>
                          <i class="fa fa-calculator" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                          <Input 
                          type="text"
                          placeholder="кількість кімнат"
                          autoComplete="countroom"
                          className={classnames('form-control', { 'is-invalid': !!errors.countroom})}
                          id="countroom"
                          name="countroom"
                          value={this.state.pcountroom}
                          onChange={this.handleChange}
                          />
                         
                          {!!errors.countroom ? <span className="help-block">{errors.countroom}</span> : ''}
                      </InputGroup>


                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend" >
                          <InputGroupText style={iconsColor}>
                          <i class="fa fa-money" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                          <Input 
                          type="text"
                          placeholder="вартість доби"
                          autoComplete="price"
                          className={classnames('form-control', { 'is-invalid': !!errors.price})}
                          id="price"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleChange}
                          />
                          <InputGroupAddon addonType="append">
                          <InputGroupText style={iconsColor}>
                          <i class="fa fa-usd" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                          {!!errors.price ? <span className="help-block">{errors.price}</span> : ''}
                      </InputGroup>


                      <Row  className="justify-content-center">
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4" disabled={isLoading}>Додати</Button>
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
      return ( done ? <Redirect to= 'a'/> : form );
  }
}

HotelAddForm.propTypes =
  {
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

  const mapState = state => {
    return {
        auth: get(state, 'auth'),
    };
  };
  
  const mapDispatch = dispatch => {
    return {
        login: (model) =>
            dispatch(userAction.login(model))

    };
};
  const HotelAdd = connect(mapState , mapDispatch)(HotelAddForm);
  export default HotelAdd;