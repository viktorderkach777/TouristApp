import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from "react-redux";
import get from 'lodash.get';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { register } from "../../../reducers/auth";
//import CaptchaService from '../../../components/captcha/captchaService';
//import * as captchaActions from '../../../components/captcha/reducer';
//import axios from 'axios';
//import CaptchaWidget from '../../../components/captcha';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      done: false,
      isLoading: false

    }
  }
  componentDidMount() {
    // CaptchaService.postNewKey();
    // this.props.dispatch({type: 'captcha/KEY_POST_STARTED'});
    //this.props.createNewKeyCaptcha();

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
        const { email, password, confirmPassword, username } = this.state;
        this.setState({ isLoading: true });
        this.props.register({ email, password, confirmPassword,username})
            .then(
                () => this.setState({ done: true }),
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

    const { username,
      isLoading,
      email,
      password,
      confirmPassword,
      } = this.state;
    
    const form = (
      <React.Fragment>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.onSubmitForm}>

                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        id="username"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                        placeholder="Email"
                        autoComplete="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange} />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                        placeholder="Confirm password"
                        autoComplete="confirmPassword"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange} />
                    </InputGroup>

                    

                    <Button color="success" block disabled={isLoading} >Create Account</Button>


                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
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
    captcha: {
      keyValue: get(state, 'captcha.key.data'),
      isKeyLoading: get(state, 'captcha.key.loading'),
      isKeyError: get(state, 'captcha.key.error'),
      isSuccess: get(state, 'captcha.key.success')
    }
  }
}

const mapDispatch = (dispatch)=>{
  return{
    register: async()=>{
      await dispatch(register)
    }
  } 
}

Register.propTypes =
    {
      register: PropTypes.func.isRequired
    }

export default connect(mapState, mapDispatch)(Register);
