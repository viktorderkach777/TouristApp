import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback } from 'reactstrap';
import { connect } from "react-redux";
import get from 'lodash.get';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import { Link } from 'react-router-dom';
import * as registerActions from './reducer';
import * as captchaActions from '../../../components/captcha/reducer';
import CaptchaWidget from '../../../components/captcha';
import CentralPageSpinner from '../../../components/CentrPageSpinner';
import defaultPath from './default-user.png'
import 'cropperjs/dist/cropper.css';

const iconsColor = {
  backgroundColor: '#00aced',
  color: '#fff',
  borderColor: '#00aced'
}

//const imageMaxSize = 3000;

class RegisterForm extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    errors: {
    },
    done: false,
    loading: false,
    isLoadingPhoto: false,
    src: '',
    imageBase64: defaultPath,
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    captchaText: "",
    imageError: true,
    errorsServer: {
    },
  };

  componentDidMount() {
    this.props.createNewKeyCaptcha();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loading !== state.loading || props.errors !== state.errorsServer || props.captcha !== state.captcha) {
      return { loading: props.loading, errorsServer: props.errors, captcha: props.captcha };
    }

    // Return null if the state hasn't changed
    return null;
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if(nextProps!==prevState) {
  //   return { loading: nextProps.loading, errorsServer: nextProps.errors, captcha: nextProps.captcha };
  //   }
  //   //else return null;
  // }


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

    this.setState({
      imageBase64: this.cropper.getCroppedCanvas().toDataURL(),
      isLoadingPhoto: false,
      src: '',
      imageError: false
    });
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
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      dateOfBirth,
      captchaText,
      imageBase64
    } = this.state;

    if (email === '') errors.email = "Cant't be empty";
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/.test(password)) errors.password = "Password must be at least 6 characters and contain digits, upper and lower case"
    if (password === '') errors.password = "Cant't be empty";
    if (confirmPassword === '') errors.confirmPassword = "Cant't be empty";
    if (confirmPassword !== password) errors.confirmPassword = "Passwords do not match";
    if (firstName === '') errors.firstName = "Cant't be empty";
    if (lastName === '') errors.lastName = "Cant't be empty";
    if (dateOfBirth === '') errors.dateOfBirth = "Cant't be empty";
    if (captchaText === '') errors.captchaText = "Cant't be empty";
    if (imageBase64 === defaultPath) errors.imageBase64 = "Download your image";

    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { keyValue } = this.props.captcha;
      const { email, password, confirmPassword, imageBase64,
        firstName, middleName, lastName, dateOfBirth, captchaText } = this.state;

      const model = {
        email, password, confirmPassword, imageBase64,
        firstName, middleName, lastName, dateOfBirth, captchaText,
        captchaKey: keyValue
      };

      this.props.register(model)
    }
    else {
      this.setState({ errors });
    }
  };

  captchaUpdate = (e) => {
    e.preventDefault()
    this.props.createNewKeyCaptcha();
  }

  render() {
    // console.log('---FormRegister state----', this.state);
    // console.log('---FormRegister props----', this.props);
    const { errors,
      loading,
      email,
      password,
      confirmPassword,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      imageBase64,
      captcha,
      errorsServer,
      imageError,
      isLoadingPhoto } = this.state;

    const form = (
      <React.Fragment>
        <CentralPageSpinner loading={loading} />
        <div className="app flex-row ">
          <Container>
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <Form onSubmit={this.onSubmitForm}>
                      <h1>Register</h1>
                      <Row>
                        <Col xs="6">
                          {/* <p className="text-muted">Create your account</p> */}
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to="/login">
                            <Button color="link" className="px-0" active tabIndex={-1}>Already singed in?</Button>
                          </Link>
                        </Col>
                      </Row>
                      {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>@</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className="form-control"
                          invalid={!!errors.email || !!errorsServer.email}
                          type="text"
                          placeholder="Email"
                          autoComplete="Email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={this.handleChange}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                        {!!errorsServer.email ? <FormFeedback>{'User with this email already exists!'}</FormFeedback> : ''}
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                          className="form-control"
                          invalid={!!errors.password}
                          placeholder="Password"
                          autoComplete="new-password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={this.handleChange} />
                        <FormFeedback>{errors.password}</FormFeedback>
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                          className="form-control"
                          invalid={!!errors.confirmPassword}
                          placeholder="Confirm password"
                          autoComplete="confirmPassword"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={this.handleChange} />
                        <FormFeedback>{errors.confirmPassword}</FormFeedback>
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="fa fa-user-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                          className="form-control"
                          invalid={!!errors.firstName}
                          placeholder="First Name"
                          autoComplete="first name"
                          id="firstName"
                          name="firstName"
                          value={firstName}
                          onChange={this.handleChange} />
                        <FormFeedback>{errors.firstName}</FormFeedback>
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="fa fa-user-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                          className="form-control"
                          invalid={!!errors.middleName}
                          placeholder="Middle Name"
                          autoComplete="middleName"
                          id="middleName"
                          name="middleName"
                          value={middleName}
                          onChange={this.handleChange} />
                        <FormFeedback>{errors.middleName}</FormFeedback>
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="fa fa-user-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                          className="form-control"
                          invalid={!!errors.lastName}
                          placeholder="Last Name"
                          autoComplete="lastName"
                          id="lastName"
                          name="lastName"
                          value={lastName}
                          onChange={this.handleChange} />
                        <FormFeedback>{errors.lastName}</FormFeedback>
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="fa fa-birthday-cake"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="date"
                          className="form-control"
                          invalid={!!errors.dateOfBirth || !!errorsServer.dateOfBirth}
                          placeholder="Date Of birth "
                          autoComplete="dateOfBirth"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={dateOfBirth}
                          onChange={this.handleChange} />
                        <FormFeedback>{errors.dateOfBirth}</FormFeedback>
                        {!!errorsServer.dateOfBirth ? <FormFeedback>{'Invalid date of birth!'}</FormFeedback> : ''}
                      </InputGroup>

                      {!!errors.imageBase64 && imageError ? <Alert color="danger" className="d-flex justify-content-center" >{errors.imageBase64}</Alert> : ''}
                      <div className='container d-flex justify-content-center'>
                        <Row>
                          <div className="form-group ">
                            <label id="labelForInput" htmlFor="inputFile">
                              {
                                !isLoadingPhoto ?
                                  <img
                                    src={imageBase64}
                                    className="img-circle"
                                    id="image"
                                    alt=""
                                    name="image"
                                    width="250" />
                                  : <p></p>
                              }
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
                      <div className="input-group-text" >
                        <span onClick={e => this.captchaUpdate(e)}>
                          <img
                            src="http://simpleicon.com/wp-content/uploads/refresh.png"
                            className="img-fluid rounded"
                            id="image"
                            alt=""
                            name="image"
                            style={{ height: "30px", width: "30px" }}
                          />
                        </span>
                        <span className="mx-auto d-block">
                          <CaptchaWidget {...captcha} />
                        </span>
                      </div>
                      <InputGroup className="mb-4 mt-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText style={iconsColor}>
                            <i className="fa fa-pencil"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                          className="form-control"
                          invalid={!!errors.captchaText || !!errorsServer.captchaText}
                          placeholder="Captcha Text"
                          autoComplete="captchaText"
                          id="captchaText"
                          name="captchaText"
                          value={this.state.captchaText}
                          onChange={this.handleChange} />
                        <FormFeedback>{errors.captchaText}</FormFeedback>
                        <FormFeedback>{errorsServer.captchaText}</FormFeedback>
                      </InputGroup>

                      <Button color="success" block disabled={loading} >Create Account</Button>

                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
    return form;
  }
}

const mapState = (state) => {
  return {
    captcha: {
      keyValue: get(state, 'captcha.key.data'),
      isKeyLoading: get(state, 'captcha.key.loading'),
      isKeyError: get(state, 'captcha.key.error'),
      isSuccess: get(state, 'captcha.key.success')
    },
    loading: get(state, 'register.post.loading'),
    failed: get(state, 'register.post.failed'),
    success: get(state, 'register.post.success'),
    errors: get(state, 'register.post.errors'),
  }
}

const mapDispatch = (dispatch) => {
  return {
    register: (model) =>
      dispatch(registerActions.registerPost(model)),
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
const Register = connect(mapState, mapDispatch)(RegisterForm);
export default Register;
