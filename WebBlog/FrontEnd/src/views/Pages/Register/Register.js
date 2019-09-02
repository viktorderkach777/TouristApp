import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from "react-redux";
import get from 'lodash.get';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import defaultPath from './default-user.png'
import * as userAction from '../../../reducers/auth';
import classnames from 'classnames';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Google from '../../../components/google';
import Facebook from '../../../components/facebook';
//import CaptchaService from '../../../components/captcha/captchaService';
import * as captchaActions from '../../../components/captcha/reducer';
//import axios from 'axios';
import CaptchaWidget from '../../../components/captcha';

const iconsColor = {
  backgroundColor: '#00aced',
  color: '#fff',
  borderColor: '#00aced'
}

//const imageMaxSize = 3000;

class RegisterForm extends Component {

  state = {
    profileUrl:'/',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {
    },
    done: false,
    isLoading: false,
    isLoadingPhoto: false,
    src: '',
    imageBase64: defaultPath,
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    captchaText: "",
    captchaDone: false,
    captchaIsLoading: false
  };

  componentDidMount() {
    // CaptchaService.postNewKey();
    // this.props.dispatch({type: 'captcha/KEY_POST_STARTED'});
    this.props.createNewKeyCaptcha();

  }

  getUrlToRedirect = () => {
    let auth = this.props.auth;
    console.log('---getUrlToRedirect----', auth);
    if (auth.isAuthenticated) {
        let roles = auth.user.roles;
        if (roles=== "User") {
            this.setState({ profileUrl: "/tours" });
        }
        else if (roles==="Admin") {
            this.setState({ profileUrl: "/admin/dashboard" });
        }
        else 
         {
          this.setState({ profileUrl: "/" });
         }
    }
    console.log('---profileUrl:',this.state.profileUrl);
  };


  changeInput = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };

    reader.readAsDataURL(files[0]);
    this.setState({ isLoadingPhoto: true });

    // const currentFile = files[0];
    // const currentFileSize = currentFile.size;
    // if (currentFileSize>imageMaxSize ){
    //     reader.readAsDataURL(currentFile);
    //     this.setState({ isLoadingPhoto: true });
    // }
    // else{
    //     alert("Фото має бути більше 3Мb");

    // };
  };

  cropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({ imageBase64: this.cropper.getCroppedCanvas().toDataURL() });
    this.setState({ isLoadingPhoto: false });
    this.setState({ src: '' });
  }

  setStateByErrors = (name, value) => {
    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleChange = e => {
    this.setStateByErrors(e.target.name, e.target.value);
  };

  captchaSetStateByErrors = (name, value) => {
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

  captchaHandleChange = e => {
    this.captchaSetStateByErrors(e.target.name, e.target.value);
  };

  operationImage = (e, type, value) => {
    e.preventDefault();

    switch (type) {

      case 'ROTARE_LEFT':
        this.cropper.rotate(value);
        break;
      case 'ROTARE_RIGHT':
        this.cropper.rotate(-value);
        break;
      case 'ZOOM+':
        this.cropper.zoom(value);
        break;
      case 'ZOOM-':
        this.cropper.zoom(value);
        break;
      default:

    }
  };


  onSubmitForm = (e) => {
    e.preventDefault();

    let errors = {};

    if (this.state.email === '') errors.email = "Cant't be empty";

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/.test(this.state.password)) errors.password = "Password must be at least 6 characters and contain digits, upper and lower case"
    if (this.state.password === '') errors.password = "Cant't be empty";
    if (this.state.confirmPassword === '') errors.confirmPassword = "Cant't be empty";
    if (this.state.confirmPassword !== this.state.password) errors.confirmPassword = "Passwords do not match";

    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      console.log('this.props.captcha', this.props.captcha);
      console.log('this.state', this.state);
      const { keyValue } = this.props.captcha;
      const { email, password, confirmPassword, imageBase64,
        firstName, middleName, lastName, dateOfBirth, captchaText } = this.state;


      this.setState({
        isLoading: true, captchaIsLoading: true
      });

      this.props.register({
        email, password, confirmPassword, imageBase64,
        firstName, middleName, lastName, dateOfBirth, captchaText,
        captchaKey: keyValue
      })
        .then(
          () => this.setState({ done: true, captchaDone: true },this.getUrlToRedirect()),
          (err) => {
            this.setState({ errors: err.response.data, isLoading: false });
          }
        );
    }
    else {
      this.setState({ errors });
    }
  };

  render() {
    console.log('---FormRegister state----', this.state);
    console.log('---FormRegister props----', this.props);
    const { errors,
      isLoading,
      email,
      password,
      confirmPassword,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      imageBase64 } = this.state;

    const { captcha } = this.props;

    const form = (
      <React.Fragment>
        <div className="app flex-row ">
          <Container>
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <Form onSubmit={this.onSubmitForm}>

                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>@</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className={classnames('form-control', { 'is-invalid': !!errors.email })}
                          type="text"
                          placeholder="Email"
                          autoComplete="Email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={this.handleChange}
                        />
                        {!!errors.email ? <span className="help-block">{errors.email}</span> : ''}
                      </InputGroup>


                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                          className={classnames('form-control', { 'is-invalid': !!errors.password })}
                          placeholder="Password"
                          autoComplete="new-password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={this.handleChange} />
                        {!!errors.password ? <span className="help-block">{errors.password}</span> : ''}
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                          className={classnames('form-control', { 'is-invalid': !!errors.confirmPassword })}
                          placeholder="Confirm password"
                          autoComplete="confirmPassword"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={this.handleChange} />
                        {!!errors.confirmPassword ? <span className="help-block">{errors.confirmPassword}</span> : ''}
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="fa fa-user-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                          className={classnames('form-control', { 'is-invalid': !!errors.firstName })}
                          placeholder="First Name"
                          autoComplete="first name"
                          id="firstName"
                          name="firstName"
                          value={firstName}
                          onChange={this.handleChange} />
                        {!!errors.firstName ? <span className="help-block">{errors.firstName}</span> : ''}
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="fa fa-user-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                          className={classnames('form-control', { 'is-invalid': !!errors.middleName })}
                          placeholder="Middle Name"
                          autoComplete="middleName"
                          id="middleName"
                          name="middleName"
                          value={middleName}
                          onChange={this.handleChange} />
                        {!!errors.middleName ? <span className="help-block">{errors.middleName}</span> : ''}
                      </InputGroup>


                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="fa fa-user-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                          className={classnames('form-control', { 'is-invalid': !!errors.lastName })}
                          placeholder="Last Name"
                          autoComplete="lastName"
                          id="lastName"
                          name="lastName"
                          value={lastName}
                          onChange={this.handleChange} />
                        {!!errors.lastName ? <span className="help-block">{errors.lastName}</span> : ''}
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="fa fa-birthday-cake"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="date"
                          className={classnames('form-control', { 'is-invalid': !!errors.dateOfBirth })}
                          placeholder="Date Of birth "
                          autoComplete="dateOfBirth"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={dateOfBirth}
                          onChange={this.handleChange} />
                        {!!errors.dateOfBirth ? <span className="help-block">{errors.dateOfBirth}</span> : ''}
                      </InputGroup>

                      <div className='container'>
                        <Row>
                          <div className="form-group">
                            <label id="labelForInput" htmlFor="inputFile">
                              {
                                !this.state.isLoadingPhoto ?
                                  <img
                                    src={imageBase64}
                                    className="img-circle"
                                    id="image"
                                    alt=""
                                    name="image"
                                    style={{ marginLeft: '80px' }}
                                    width="250" />
                                  : <p></p>
                              }
                              {!!errors.image ? <span className="help-block">{errors.image}</span> : ''}
                              <input type="file" id="inputFile" onChange={this.changeInput} ></input>
                            </label>
                          </div>

                          <div className={!this.state.isLoadingPhoto ? "div-hidden" : "div-visible form-group"} >
                            <Cropper
                              style={{ height: 400, width: 400, overflow: 'hidden' }}
                              aspectRatio={1 / 1}
                              preview=".img-preview"
                              guides={false}
                              src={this.state.src}
                              ref={cropper => { this.cropper = cropper; }}
                            />
                            <p></p>
                            <button type="button" onClick={this.cropImage} className="btn btn-primary">Crop Image</button>
                            <button type="button" onClick={e => this.operationImage(e, 'ZOOM+', 0.1)} className="btn btn-primary  btn-crop"><i className="fa fa-search-plus" aria-hidden="true" /></button>
                            <button type="button" onClick={e => this.operationImage(e, 'ZOOM-', -0.1)} className="btn btn-primary  btn-crop"><i className="fa fa-search-minus" aria-hidden="true" /></button>
                            <button type="button" onClick={e => this.operationImage(e, 'ROTARE_LEFT', 45)} className="btn btn-primary  btn-crop"><i className="fa fa-repeat" aria-hidden="true" /></button>
                            <button type="button" onClick={e => this.operationImage(e, 'ROTARE_RIGHT', 45)} className="btn btn-primary  btn-crop"><i className="fa fa-undo" aria-hidden="true" /></button>
                          </div>
                        </Row>
                      </div>
                      <span className="input-group-text">
                        <CaptchaWidget {...captcha} />
                      </span>
                      <div className="mb-3 input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </span>
                        </div>
                        <input id="captchaText"
                          name="captchaText"
                          type="text"
                          className="form-control "
                          value={this.state.captchaText}
                          onChange={this.captchaHandleChange} />
                      </div>

                      <Button  color="success" block disabled={isLoading} >Create Account</Button>

                    </Form>
                  </CardBody>
                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="12" sm="6">
                        <Facebook />
                      </Col>
                      <Col xs="12" sm="6">
                        {/* <Google /> */}
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
    return (
      this.state.done ?
        <Redirect to="/" /> : form
    );
  }
}

const mapState = (state) => {
  return {
    auth: get(state, 'auth'),
    captcha: {
      keyValue: get(state, 'captcha.key.data'),
      isKeyLoading: get(state, 'captcha.key.loading'),
      isKeyError: get(state, 'captcha.key.error'),
      isSuccess: get(state, 'captcha.key.success')
    }
  }
}

const mapDispatch = (dispatch) => {
  return {
    register: (model) =>
      dispatch(userAction.register(model)),
    createNewKeyCaptcha: () => {
      dispatch(captchaActions.createNewKey());
    }
  };
}

RegisterForm.propTypes =
  {
    register: PropTypes.func.isRequired
    // isKeyError:PropTypes.bool.isRequired,
    // isKeyLoading:PropTypes.bool.isRequired,
    // isSuccess:PropTypes.bool.isRequired
  }
  const Register = connect(mapState , mapDispatch)(RegisterForm);
  export default Register;
