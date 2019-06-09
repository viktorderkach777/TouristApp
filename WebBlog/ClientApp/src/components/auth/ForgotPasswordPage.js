import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/authActions";
import validateemail from '../../helpers/validateEmail';


class ForgotPasswordPage extends Component {
    
    state = {
        email: '',
        errors: {
        },
        done: false,
        isLoading: false,
        serverAnswer: ''
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
    }

    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }

    onSubmitForm = (e) => {
        e.preventDefault();

        let errors = {};
        if (!validateemail(this.state.email)) errors.email = "Enter valid email"
        if (this.state.email === '') errors.email = "Can't be empty"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { email } = this.state;
            this.setState({ isLoading: true });
            this.props.forgotPassword({ email })
                .then(
                    (res) => this.setState({ done: true, serverAnswer: res.data.answer }),
                    (err) => {
                        this.setState({ errors: err.response.data, isLoading: false });
                    }
                );
        }
        else {
            this.setState({ errors });
        }
    }
    render() {
        const { errors, isLoading, serverAnswer } = this.state;
        return (
            <Row  className="justify-content-md-center">
                <Col md={4} offset={4}>
                        <div className="text-center mb-4">
                                <h4>Forgot your password?</h4>
                                <p>Enter your email address and we will send you instructions on how to reset your password.</p>
                        </div>
                        <form onSubmit={this.onSubmitForm}>
                            {!!errors.invalid ?
                                <div className="alert alert-danger">
                                    {errors.invalid}.
                            </div> : ''}

                            {!!serverAnswer ?
                                <div className="alert alert-success">
                                    {serverAnswer}
                                </div> : ''}

                            <div className='form-group'>
                                <input type="email"
                                    className={classnames('form-control', { 'is-invalid': !!errors.email})}
                                    id="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={this.state.email}
                                    onChange={this.handleChange} />
                                {!!errors.email ? <span className="help-block">{errors.email}</span> : ''}
                            </div>

                            <button type="submit" className="btn btn-info btn-block" disabled={isLoading}>Reset Password</button>
                        </form>
                        <br></br>
                        <div className="text-center">
                            <LinkContainer to="/register">
                                <a>Register an Account</a>
                            </LinkContainer>
                       </div>
                </Col>
            </Row>
        );
    }
}

ForgotPasswordPage.propTypes =
    {
        forgotPassword: PropTypes.func.isRequired
    }

export default connect(null, { forgotPassword })(ForgotPasswordPage);