import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from "react-redux";
import { changePassword } from "../../actions/authActions";
import PropTypes from 'prop-types';
import './userProfile/UserPage.css'
import { Row } from 'react-bootstrap';

class ChangePasswordForm extends Component {

    state = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        errors: {
        },
        done: false,
        isLoading: false
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
        this.setState({ done: false});
    }

    onSubmitForm = (e) => {
        e.preventDefault();

        let errors = {};

        if (this.state.oldPassword === '') errors.oldPassword = "Cant't be empty"

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/.test(this.state.newPassword)) errors.newPassword = "Password must be at least 6 characters and contain digits, upper and lower case"
        if (this.state.oldPassword === this.state.newPassword) errors.newPassword = "Passwords can not match"
        if (this.state.newPassword === '') errors.newPassword = "Can't be empty"
        if (this.state.confirmNewPassword === '') errors.confirmNewPassword= "Can't be empty"
        if (this.state.confirmNewPassword !== this.state.newPassword) errors.confirmNewPassword = "Passwords do not match"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { oldPassword, newPassword } = this.state;
            const id = this.props.auth.user.id;
            this.setState({ isLoading: true,errors:{} });
            this.props.changePassword({ id, oldPassword, newPassword })
                .then(
                    () => this.setState({ done: true,isLoading: false }),
                    (err) => {
                        this.setState({ errors: err.response.data, isLoading: false,done:false });
                    }
                );
        }
        else {
            this.setState({ errors });
        }
    }

    render() {
        const { errors, isLoading } = this.state;
        return (
            <Row className="justify-content-md-center vertical-down"> 
            <form onSubmit={this.onSubmitForm} >
                <h3 className="text-center">Change password</h3>

                {!!errors.invalid ?
                    <div className="alert alert-danger">
                        {errors.invalid}
                </div> : ''}

                {this.state.done ?
                    <div className="alert alert-success">
                        Password Changed!
                </div> : ''
                }
                
                <div className='form-group'>
                    <label htmlFor="oldPassword">Password</label>
                    <div class="input-group">
                        <span class="input-group-text info"><i class="fas fa-key"></i></span>
                        <input type="password"
                            className={classnames('form-control', { 'is-invalid': !!errors.oldPassword})}
                            id="oldPassword"
                            name="oldPassword"
                            value={this.state.oldPassword}
                            onChange={this.handleChange}
                            autoComplete="true" />
                    </div>
                    {!!errors.oldPassword ? <span className="help-block">{errors.oldPassword}</span> : ''}
                </div>


                <div className='form-group'>
                    <label htmlFor="newPassword">New Password</label>
                    <div class="input-group">
                        <span class="input-group-text info"><i class="fas fa-unlock-alt"></i></span>
                        <input type="password"
                            className={classnames('form-control', { 'is-invalid': !!errors.newPassword})}
                            id="newPassword"
                            name="newPassword"
                            value={this.state.newPassword}
                            onChange={this.handleChange} 
                            autoComplete="true"/>
                    </div> 
                    {!!errors.newPassword ? <span className="help-block">{errors.newPassword}</span> : ''}
                </div>


                <div className='form-group'>
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <div class="input-group">
                        <span class="input-group-text info"><i class="fas fa-lock"></i></span>
                        <input type="password"
                            className={classnames('form-control', { 'is-invalid': !!errors.confirmNewPassword})}
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={this.state.confirmNewPassword}
                            onChange={this.handleChange} 
                            autoComplete="true"/>
                    </div>   
                    {!!errors.confirmNewPassword ? <span className="help-block">{errors.confirmNewPassword}</span> : ''}
                </div>

                <div style= {{textAlign: "center"}}>
                        <button type="submit" className="btn btn-info button-change " disabled={isLoading}>Change</button>
                </div>
                
            </form>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

ChangePasswordForm.propTypes =
    {
        changePassword: PropTypes.func.isRequired
    }

export default connect(mapStateToProps, { changePassword })(ChangePasswordForm);