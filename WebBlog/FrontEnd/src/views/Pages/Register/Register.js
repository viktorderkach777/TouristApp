import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
//import PropTypes from "prop-types";
import { connect } from "react-redux";
import get from 'lodash.get';
import axios from 'axios';
import CaptchaWidget from '../../../components/captcha';
//import CaptchaService from '../../../components/captcha/captchaService';
import * as captchaActions from '../../../components/captcha/reducer';


class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      captchaText: "",
      done: false,
      isLoading: false
    }
  }
  componentDidMount() {
    // CaptchaService.postNewKey();
    // this.props.dispatch({type: 'captcha/KEY_POST_STARTED'});
    this.props.createNewKeyCaptcha();

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

  onSubmitForm = e => {
    e.preventDefault();
    const { captchaText } = this.state;

    const { keyValue } = this.props.captcha;

    let errors = {};
    if (captchaText === "") errors.captchaText = "Поле не може бути пустим!";

    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      this.setState({
        isLoading: true
      });
      const model = {
        captchaText,
        captchaKey: keyValue
      };
      console.log('model send data', model);
      var url = "https://localhost:44388/api/account/register";
      axios.post(url, model)
        .then(() => this.setState({
          done: true
        }),
          err => {
            //this.reloadCaptcha();
            this.setState({
              errors: err.response.data,
              isLoading: false
            })
          }
        );
    } else {
      this.setState({ errors });
    }
  };
  render() {
    const {captcha}=this.props;
    console.log('-----props-----', this.props);
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <InputGroupText>

                        <CaptchaWidget {...captcha} />

                      </InputGroupText>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-pencil" aria-hidden="true" onClick={this.reloadCaptcha}></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                        className="form-control"
                        id="captchaText"
                        name="captchaText"
                        value={this.state.captchaText}
                        onChange={this.handleChange} />
                    </InputGroup>
                    
                    <Button color="success" block>Create Account</Button>
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

const mapDispatch = {

  createNewKeyCaptcha: () => {
    return dispatch => dispatch(captchaActions.createNewKey());
  }

}



export default connect(mapState, mapDispatch)(Register);
