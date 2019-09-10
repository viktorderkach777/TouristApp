import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from "react-redux";
import * as userAction from '../../../reducers/auth';
import get from 'lodash.get';
//import validateemail from '../../../helpers/validateEmail'; 
import { Redirect } from "react-router";
class LoginForm extends Component {

  state = {
    email: '',
    password: '',
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
    }
    console.log('---profileUrl----',this.state.profileUrl);
  };

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);
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
          () =>{this.setState({ done: true },this.getUrlToRedirect());},
          (err) => this.setState({ errors: err.response.data, isLoading: false })
        );
    }
    else 
    {
      this.setState({ errors });
    }
  };

  render() {
    const { errors, isLoading,profileUrl, done } = this.state;
    console.log('---FormLogin state----', this.state);
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
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                  {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}

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
                          className={classnames('form-control', { 'is-invalid': !!errors.email})}
                          id="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          />
                          {!!errors.email ? <span className="help-block">{errors.email}</span> : ''}
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          className={classnames('form-control', { 'is-invalid': !!errors.password})}
                          id="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          />
                          {!!errors.password ? <span className="help-block">{errors.password}</span> : ''}
                      </InputGroup>

                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" disabled={isLoading}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
      </React.Fragment>
      );
      return ( done ? <Redirect to= {profileUrl} /> : form );
  }
}

LoginForm.propTypes =
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
  const Login = connect(mapState , mapDispatch)(LoginForm);
  export default Login;