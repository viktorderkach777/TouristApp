import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';

import classnames from 'classnames';


import { Redirect } from "react-router";
//import hotelimg from '../addHotel/hotel.png';
import  AdminService from '../AdminService'

const iconsColor = {
  backgroundColor: '#00aced',
  color: '#fff',
  borderColor: '#00aced'
}

class TourAddForm extends Component {
  
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
         selectedRegion:'',
         hotelsLoad:false,
         hotels:[],
         selectedHotel:'',
      countday:'',
      fromData:'',
      price: '100',
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
    .catch(() => {console.log('--failed--'); });
    }

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);
  };

  handleChangeSelectCountry = (e) => {
   
    this.setStateByErrors(e.target.name, e.target.value);
      AdminService.getRegiones(e.target.value)
          .then(res => {
            const regions = res.data;
            this.setState({ regions, regionsLoad:true });
          })
          .catch(() => {console.log('--failed--');
      });

  };

  handleChangeSelectRegion = (e) => {
   
    this.setStateByErrors(e.target.name, e.target.value);
      AdminService.getHotels(e.target.value)
          .then(res => {
            const hotels = res.data;
            this.setState({ hotels, hotelsLoad:true });
          })
          .catch(() => {console.log('--failed--');
      });

  };

  
  onSubmitForm = (e) => {
    e.preventDefault();
    let errors = {};
    console.log('submit tour');
    const {countday,price,fromData,selectedHotel } = this.state;
    
    if (this.state.price === '') errors.price = "Can't be empty!"
    if (this.state.selectedCountry === '') errors.selectedCountry = "Can't be empty!"
    if (this.state.selectedRegion === '') errors.selectedRegion = "Can't be empty!"
    if (this.state.selectedHotel === '') errors.selectedHotel = "Can't be empty!"

    const isValid = Object.keys(errors).length === 0
    if (isValid)
    {
     const model = {
        hotelId: selectedHotel,
        price:price,
        DaysCount:countday,
        FromData:fromData,
        CityDepartureId:'1'
    };
      console.log('validform addtour', model);
     
      this.setState({ isLoading: true });
      AdminService.addTour(model)
      .then(
          () => { this.setState({ done: true, isLoading: false}, )},
          (err) => this.setState({ errors: err.response.data, isLoading: false })
      )
      .catch(() => { console.log('--failed--'); });
}
else {
  this.setState({ errors });
}
  };

  render() {
    const {hotels, hotelsLoad, regions, regionsLoad, countries,errors, isLoading, done } = this.state;
    console.log('----AddTour---', this.state);
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
                    {/* <img src={hotelimg} style={{height:'100px'}} alt='hotel'></img> */}
                      <h1> Додати тур</h1>
                      <p className="text-muted">Додайте новий тур</p>
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
                                  onChange={this.handleChangeSelectCountry}>
                              {countries.map(item => <option  key={item.id} value={item.id} >{item.name}</option>)} 
                                </Input>
                   </InputGroup>

                   <InputGroup  className="mb-3" hidden={!regionsLoad} >
                  <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                          <i className="fa fa-map-marker" aria-hidden="true"></i>
                          </InputGroupText>
                   </InputGroupAddon>
                              <Input type="select"
                              name="selectedRegion"
                              id="selectedRegion" 
                              value={this.state.selectedRegion}
                              onChange={this.handleChangeSelectRegion}>
                          {regions.map(item => <option  key={item.id} value={item.id} >{item.name}</option>)} 
                             </Input>
                   </InputGroup>

                   <InputGroup  className="mb-3" hidden={!hotelsLoad} >
                      <InputGroupAddon addonType="prepend">
                              <InputGroupText style={iconsColor}>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              </InputGroupText>
                      </InputGroupAddon>
                                  <Input type="select"
                                  name="selectedHotel"
                                  id="selectedHotel" 
                                  value={this.state.selectedHotel}
                                  onChange={this.handleChange}>
                              {hotels.map(item => <option  key={item.id} value={item.id} >{item.name}</option>)} 
                                </Input>
                      </InputGroup>
                      

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend" >
                          <InputGroupText style={iconsColor}>
                          <i className="fa fa-calculator" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                          <Input 
                          type="text"
                          placeholder="кількість днів"
                          autoComplete="countday"
                          className={classnames('form-control', { 'is-invalid': !!errors.countday})}
                          id="countday"
                          name="countday"
                          value={this.state.countday}
                          onChange={this.handleChange}
                          />
                         
                          {!!errors.countday ? <span className="help-block">{errors.countday}</span> : ''}
                      </InputGroup>


                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend" >
                          <InputGroupText style={iconsColor}>
                          <i className="fa fa-money" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                          <Input 
                          type="date"
                          placeholder="дата вильоту"
                          autoComplete="fromData"
                          className={classnames('form-control', { 'is-invalid': !!errors.fromData})}
                          id="fromData"
                          name="fromData"
                          value={this.state.fromData}
                          onChange={this.handleChange}
                          />
                          {!!errors.fromData ? <span className="help-block">{errors.fromData}</span> : ''}
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
      return ( done ? <Redirect to= '/admin/'/> : form );
  }
}


  const TourAdd = TourAddForm;
  export default TourAdd;