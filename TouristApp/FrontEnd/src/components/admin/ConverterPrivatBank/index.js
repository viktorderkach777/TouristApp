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
        kurs: [],
        grn:'',
        usd:'',
        eur:'',
        rur:'',
        currentDate: '',
        errors: {
        },
        done: false,
        isLoading: false
    };

    componentDidMount() {
        console.log('---componentDiDMount----');
        AdminService.getKurs()
                .then(res => {
                    const kurs = res.data.answer;
                    this.setState({ kurs, done: true, isLoading: false })
                })
                .catch(() => { console.log('--failed--'); });

    }

   

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

    changeKurs = (e,type) => {
        e.preventDefault();
   // this.setStateByErrors(e.target.name, e.target.value);
        
       // console.log('type',type);
       const {kurs,grn,rur,usd,eur}=this.state;
        switch (type) {

            case 'grn':
             this.setState({
                grn: e.target.value,
                rur:isNaN(e.target.value)?'0':(e.target.value/kurs.rur).toFixed(2),
                usd:isNaN(e.target.value)?'0':(e.target.value/kurs.usd).toFixed(2),
                eur:isNaN(e.target.value)?'0':(e.target.value/kurs.eur).toFixed(2)
             });
               break;
            case 'rur':
                    this.setState({
                        rur: e.target.value,
                        grn:isNaN(e.target.value)?'0':(e.target.value*kurs.rur).toFixed(2),
                        usd:isNaN(e.target.value)?'0':(e.target.value*kurs.rur/kurs.usd).toFixed(2),
                        eur:isNaN(e.target.value)?'0':(e.target.value*kurs.rur/kurs.eur).toFixed(2)
                     });
             
              break;
            case 'usd':
                    this.setState({
                        usd: e.target.value,
                        grn:isNaN(e.target.value)?'0':(e.target.value*kurs.usd).toFixed(2),
                        rur:isNaN(e.target.value)?'0':(e.target.value*kurs.usd/kurs.rur).toFixed(2),
                        eur:isNaN(e.target.value)?'0':(e.target.value*kurs.usd/kurs.eur).toFixed(2)
                     });
              break;
            case 'eur':
                    this.setState({
                        eur: e.target.value,
                        grn:isNaN(e.target.value)?'0':(e.target.value*kurs.eur).toFixed(2),
                        rur:isNaN(e.target.value)?'0':(e.target.value*kurs.eur/kurs.rur).toFixed(2),
                        usd:isNaN(e.target.value)?'0':(e.target.value*kurs.eur/kurs.usd).toFixed(2)
                     });
              break;
            default:
     
          }
        
    }


    onSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        console.log('submit');
        // if (this.state.countryName === '') errors.countryName = " Can't be empty!"
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            
            AdminService.getKurs()
                .then(res => {
                    const kurs = res.data.answer;
                    this.setState({ kurs, done: true, isLoading: false }, () => notify(" Курси від Приватбанку отримано ", '#071'))
                })
                .catch(() => { console.log('--failed--'); });
        }
        else {
            this.setState({ errors });
        }
    };

    render() {
        const { errors, isLoading,kurs,grn,rur,usd,eur } = this.state;
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
                                        <Input type="text" value={grn} name="grn" id="grn" placeholder=" "  onChange={e => this.changeKurs(e,'grn')} />
                                    </FormGroup>
                                    <FormGroup className="m-2 mr-sm-2 mb-sm-0">
                                        <Label for="rub" className="mr-sm-2">RUB</Label>
                                        <Label for="rub" className="mr-sm-2">{kurs.rur}</Label>
                                        <Input type="text"  value={rur} name="rub" id="rub" placeholder=" "  onChange={e => this.changeKurs(e,'rur')} />
                                    </FormGroup>
                                    <FormGroup className="m-2 mr-sm-2 mb-sm-0">
                                        <Label for="usd" className="mr-sm-2">USD</Label>
                                        <Label for="usd" className="mr-sm-2">{kurs.usd}</Label>
                                        <Input style={{width:'55%'}} type="text" value={usd} name="usd" id="usd" placeholder=" " onChange={e => this.changeKurs(e,'usd')} />
                                    </FormGroup>
                                    <FormGroup className="m-2 mr-sm-2 mb-sm-0 justify-content-left" >
                                        <Label for="eur" className="mr-sm-2">EUR</Label>
                                        <Label for="eur" className="mr-sm-2">{kurs.eur}</Label>
                                        <Input style={{width:'55%'}} type="text" value={eur} name="eur" id="eur" placeholder=" "  onChange={e => this.changeKurs(e,'eur')}/>
                                    </FormGroup>
                                    {/* <Button color ='primary' type="submit" >Submit</Button> */}
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