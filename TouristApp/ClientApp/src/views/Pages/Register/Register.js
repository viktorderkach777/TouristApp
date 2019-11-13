import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback } from 'reactstrap';
import { connect } from "react-redux";
import get from 'lodash.get';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import { Link } from 'react-router-dom';
import {registerPost} from './reducer';
import * as captchaActions from '../../../components/captcha/reducer';
import CaptchaWidget from '../../../components/captcha';
import CentralPageSpinner from '../../../components/CentrPageSpinner';
import defaultPath from './default-user.png'
import refreshPng from './refresh.png'
import 'cropperjs/dist/cropper.css';

const propTypes = {
  register: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const iconsColor = {
  backgroundColor: '#00aced',
  color: '#fff',
  borderColor: '#00aced'
}

const IMAGE_MIN_SIZE = 3000;
const IMAGE_MAX_SIZE = 10000000;


class Register extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    errors: {
    },
    done: false,
    loading: false,
    //loading: this.props.loading,
    isLoadingPhoto: false,
    src: '',
    imageBase64: defaultPath,
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    captchaText: "",
    imageError: true,
    // errorsServer: {
    // },
  };

  componentDidMount() {
    this.props.createNewKeyCaptcha();
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.loading !== state.loading || props.errors !== state.errorsServer || props.captcha !== state.captcha) {
  //     return { loading: props.loading, errorsServer: props.errors, captcha: props.captcha };
  //   }

  //   // Return null if the state hasn't changed
  //   return null;
  // }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    console.log('Change props ');
    this.setState({
        loading: nextProps.loading,
        errors: nextProps.errors,
        captcha: nextProps.captcha
    });
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
    if (files && files[0]) {
      const currentFile = files[0];
      const currentFileSize = currentFile.size;
      //alert(currentFileSize);
      if (!currentFile.type.match(/^image\//)) {
        alert("Error file type");
      }
      else if (currentFileSize > IMAGE_MAX_SIZE) {
        alert("The image size must be less than 10Mb");
      }
      else if (currentFileSize < IMAGE_MIN_SIZE) {
        alert("The image size must be more than 3Kb");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.toggle(e);
          this.setState({ src: reader.result });
        };
        reader.readAsDataURL(currentFile);
      }
    } else {
      alert("Select an image, please");
    }
  };

  toggle = e => {
    //e.preventDefault();
    this.setState(prevState => ({
      isLoadingPhoto: !prevState.isLoadingPhoto
    }));
  };

  cropImage = (e) => {
    e.preventDefault();
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


  optionCropImage = (e, option, value) => {
    e.preventDefault();
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return;
    }

    switch (option) {
      case "rotate":
        this.cropper.rotate(value);
        break;
      case "zoom":
        this.cropper.zoom(value);
        break;
      default:
        break;
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

  _onkeyPress = e => {
    return e.key === "Enter" ? this.onSubmitForm(e) : null
  }

  captchaUpdate = (e) => {
    e.preventDefault()
    this.props.createNewKeyCaptcha();
  }

  render() {
    //  console.log('---FormRegister state----', this.state);
    //  console.log('---FormRegister props----', this.props);
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
      //errorsServer,
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
                          invalid={!!errors.email}
                          type="text"
                          placeholder="Email"
                          autoComplete="Email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={this.handleChange}
                          onKeyPress={this._onkeyPress}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                        {/* {!!errorsServer.email ? <FormFeedback>{'User with this email already exists!'}</FormFeedback> : ''} */}
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
                          onChange={this.handleChange}
                          onKeyPress={this._onkeyPress} />
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
                          onChange={this.handleChange}
                          onKeyPress={this._onkeyPress} />
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
                          onChange={this.handleChange}
                          onKeyPress={this._onkeyPress} />
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
                          onChange={this.handleChange}
                          onKeyPress={this._onkeyPress} />
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
                          onChange={this.handleChange}
                          onKeyPress={this._onkeyPress} />
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
                          invalid={!!errors.dateOfBirth}
                          placeholder="Date Of birth "
                          autoComplete="dateOfBirth"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={dateOfBirth}
                          onChange={this.handleChange}
                          onKeyPress={this._onkeyPress} />
                        <FormFeedback>{errors.dateOfBirth}</FormFeedback>
                        {/* {!!errorsServer.dateOfBirth ? <FormFeedback>{'Invalid date of birth!'}</FormFeedback> : ''} */}
                      </InputGroup>

                      {!!errors.imageBase64 && imageError ? <Alert color="danger" className="d-flex justify-content-center" >{errors.imageBase64}</Alert> : ''}
                      <div className='container d-flex justify-content-center'>
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
                          <div className="fluid-container d-flex justify-content-center">
                            <div className="col-12 ">
                              <Card>
                                <CardBody>
                                  <div style={{ width: "100%" }}>
                                    <Cropper
                                      // style={{ height: 400, width: 400, overflow: 'hidden' }}
                                      style={{ height: 400, width: "100%" }}
                                      aspectRatio={1 / 1}
                                      preview=".img-preview"
                                      guides={false}
                                      viewMode={1}
                                      dragMode="move"
                                      src={this.state.src}
                                      ref={cropper => { this.cropper = cropper; }}
                                    />
                                  </div>
                                </CardBody>
                                <CardFooter>
                                  <div className="row">
                                    <div className="col">
                                      <button className="btn btn-success" onClick={e => this.cropImage(e)}>
                                        Crop
                                      </button>
                                      <button className="btn btn-danger" onClick={e => this.toggle(e)}>
                                        Cancel
                                      </button>
                                    </div>
                                    <div className="order-last">
                                      <div>
                                        <button className="btn btn-info" onClick={e => this.optionCropImage(e, "rotate", -90)}>
                                          <i className="fa fa-rotate-left" />
                                        </button>
                                        <button className="btn btn-info" onClick={e => this.optionCropImage(e, "rotate", 90)}>
                                          <i className="fa fa-rotate-right" />
                                        </button>

                                        <button className="btn btn-info" onClick={e => this.optionCropImage(e, "zoom", 0.1)}>
                                          <i className="fa fa-search-plus" />
                                        </button>
                                        <button className="btn btn-info" onClick={e => this.optionCropImage(e, "zoom", -0.1)}>
                                          <i className="fa fa-search-minus" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </CardFooter>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="input-group-text" >
                        <span onClick={e => this.captchaUpdate(e)}>
                          <img
                            src={refreshPng}
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
                          invalid={!!errors.captchaText}
                          placeholder="Captcha Text"
                          autoComplete="captchaText"
                          id="captchaText"
                          name="captchaText"
                          value={this.state.captchaText}
                          onChange={this.handleChange}
                          onKeyPress={this._onkeyPress} />
                        <FormFeedback>{errors.captchaText}</FormFeedback>                       
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
    //loading: get(state, 'register.post.loading'),
    //failed: get(state, 'register.post.failed'),
    //success: get(state, 'register.post.success'),
    //errors: get(state, 'register.post.errors'),
    loading: state.register.loading,
    errors: state.register.errors,
  }
}

const mapDispatch = (dispatch) => {
  return {
    register: (model) =>
      dispatch(registerPost(model)),
    createNewKeyCaptcha: () => {
      dispatch(captchaActions.createNewKey());
    }
  };
}

Register.propTypes = propTypes;
  // {
  //   register: PropTypes.func.isRequired
  //   // isKeyError:PropTypes.bool.isRequired,
  //   // isKeyLoading:PropTypes.bool.isRequired,
  //   // isSuccess:PropTypes.bool.isRequired
  // }
  
export default connect(mapState, mapDispatch)(Register);
