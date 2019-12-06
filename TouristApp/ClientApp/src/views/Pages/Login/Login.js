import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as loginActions from './reducer';
import get from 'lodash.get';
import CentralPageSpinner from '../../../components/CentrPageSpinner';
import Google from '../../../components/google';
import Facebook from '../../../components/facebook';
import * as kursAction from '../../../components/admin/converterPrivatBank/reducer'

const propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setCurrency: PropTypes.func.isRequired,
};

const defaultProps = {};


class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: {
    },
    loading: false
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

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    //const {setCurrency} = this.props;
    let errors = {};

    if (this.state.email === '') errors.email = "Can't be empty!"
    if (this.state.password === '') errors.password = "Can't be empty!"

    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      const { email, password } = this.state;
      const model = {
        Email: email,
        Password: password
      };
      this.props.setCurrency("USD");
      this.props.login(model);
    }
    else {
      this.setState({ errors });
    }
  };

  _onkeyPress = e => {
    return e.key === "Enter" ? this.onSubmitForm(e) : null
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // if(nextProps.loading!==prevState.loading) {
  //   return { loading: nextProps.loading, errorsServer: nextProps.errors };
  //   //}
  //   //else return null;
  // }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    this.setState({
      loading: nextProps.loading,
      errors: nextProps.errors
    });
  }

  render() {
    const { errors, loading } = this.state;

    return (
      <React.Fragment>
        <CentralPageSpinner loading={loading} />

        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form onSubmit={this.onSubmitForm}>
                        <h1>Login</h1>
                        {!!errors.invalid ?
                          <div className="invalid-feedback d-block">
                            {errors.invalid}
                          </div> : ''}

                        <Row>
                          <Col xs="6">
                            {/* <p className="text-muted">Sign In to your account</p> */}
                          </Col>
                          <Col xs="6" className="text-right">
                            <Link to="/register">
                              <Button color="link" className="px-0" active tabIndex={-1}>Register Now!</Button>
                            </Link>
                          </Col>
                        </Row>

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
                            className="form-control"
                            invalid={!!errors.email}
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            onKeyPress={this._onkeyPress}
                          />
                          <FormFeedback>{errors.email}</FormFeedback>
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
                            className="form-control"
                            invalid={!!errors.password}

                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            onKeyPress={this._onkeyPress}
                          />
                          <FormFeedback>{errors.password}</FormFeedback>
                        </InputGroup>

                        <Row>
                          <Col xs="6">
                            <Button color="primary" className="px-4" disabled={loading}>Login</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">Forgot password?</Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                    <CardFooter className="p-4">
                      <Row>
                        <Col xs="12" sm="6">
                          <Facebook />
                        </Col>
                        <Col xs="12" sm="6">
                          <Google />
                        </Col>
                      </Row>
                    </CardFooter>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>

      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    loading: get(state, 'login.post.loading'),
    failed: get(state, 'login.post.failed'),
    success: get(state, 'login.post.success'),
    errors: get(state, 'login.post.errors'),
  }
}

const mapDispatch = (dispatch) => {
  return {
    login: (model) => {
      dispatch(loginActions.loginPost(model));
    },
    setCurrency: (name) => {
      dispatch(kursAction.setCurrency(name))
    },
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default connect(mapState, mapDispatch)(Login);;