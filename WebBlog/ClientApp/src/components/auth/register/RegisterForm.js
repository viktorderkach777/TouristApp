import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { register } from "../../../actions/authActions";
import { Redirect } from 'react-router-dom';
import defaultPath from './default-user.png'
import './inputDes.css'
import { Row } from 'react-bootstrap'
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import validateemail from '../../../helpers/validateEmail';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            dateOfBirth: ''
        };
        this.cropImage = this.cropImage.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }
    changeInput(e) {
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
    }
    cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            imageBase64: this.cropper.getCroppedCanvas().toDataURL()
        });
        this.setState({ isLoadingPhoto: false });
        this.setState({ src: '' });
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
        //const { name, value } = e.target;
        //this.setStateByErrors({ [name]: value });
        //this.setStateByErrors(e.target.name, e.target.value);

        const {errors}= this.state;
        const {name, value}= e.target;
        if (!!errors[name]) {
            let clone_errors = Object.assign({}, errors);
            delete clone_errors[name];
            this.setState(
                {
                    [name]: value,
                    errors: clone_errors
                }
            )
        }
        else {
            this.setState(
                { [name]: value })
        }
    }


    onSubmitForm = (e) => {
        e.preventDefault();

        let errors = {};
        if (!validateemail(this.state.email)) errors.email = "Enter valid email"
        if (this.state.email === '') errors.email = "Cant't be empty"

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/.test(this.state.password)) errors.password = "Password must be at least 6 characters and contain digits, upper and lower case"
        if (this.state.password === '') errors.password = "Cant't be empty"
        if (this.state.confirmPassword === '') errors.confirmPassword = "Cant't be empty"
        if (this.state.confirmPassword !== this.state.password) errors.confirmPassword = "Passwords do not match"

        const isValid = Object.keys(errors).length === 0

        if (isValid) {
            const { email, password, confirmPassword, imageBase64,
                firstName, middleName, lastName, dateOfBirth} = this.state;
            this.setState({ isLoading: true });
            this.props.register({ email, password, confirmPassword, imageBase64,
                firstName,  middleName, lastName, dateOfBirth})
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
      
    }
    render() {
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

        
            const form = (<form onSubmit={this.onSubmitForm}>
                <h1 className="text-center">Register</h1>
                {
                    !!errors.invalid ?
                        <div className="alert alert-danger">
                            <strong>Danger!</strong> {errors.invalid}.
                    </div> : ''}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        className={classnames('form-control', { 'is-invalid': !!errors.email})}
                        id="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange} />
                    {!!errors.email ? <span className="help-block">{errors.email}</span> : ''}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        className={classnames('form-control', { 'is-invalid': !!errors.password})}
                        id="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange} />
                    {!!errors.password ? <span className="help-block">{errors.password}</span> : ''}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password"
                        className={classnames('form-control', { 'is-invalid': !!errors.confirmPassword})}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange} />
                    {!!errors.confirmPassword ? <span className="help-block">{errors.confirmPassword}</span> : ''}
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text"
                        className={classnames('form-control', { 'is-invalid': !!errors.firstName})}
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={this.handleChange} />
                    {!!errors.firstName ? <span className="help-block">{errors.firstName}</span> : ''}
                </div>
                <div className="form-group">
                    <label htmlFor="middleName">Middle Name</label>
                    <input type="text"
                        className={classnames('form-control', { 'is-invalid': !!errors.middleName})}
                        id="middleName"
                        name="middleName"
                        value={middleName}
                        onChange={this.handleChange} />
                    {!!errors.middleName ? <span className="help-block">{errors.middleName}</span> : ''}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                        className={classnames('form-control', { 'is-invalid': !!errors.lastName})}
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={this.handleChange} />
                    {!!errors.lastName ? <span className="help-block">{errors.lastName}</span> : ''}
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input type="Date"
                        className={classnames('form-control', { 'is-invalid': !!errors.dateOfBirth})}
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={this.handleChange} />
                    {!!errors.dateOfBirth ? <span className="help-block">{errors.dateOfBirth}</span> : ''}
                </div>
                <div className='container'>
                <Row>
                <div className="form-group ">    
                        <label id="labelForInput" htmlFor="inputFile">
                            {
                                !this.state.isLoadingPhoto ?
                               <img
                                        src={imageBase64}
                                        className="img-circle"
                                        id="image"
                                        alt=""
                                        name="image"
                                        width="250"/>
                                    : <p></p>
                            }
                            {!!errors.image ? <span className="help-block">{errors.image}</span> : ''}
                            <input type="file" id="inputFile" onChange={this.changeInput} ></input>
                        </label>
                    </div>

                    <div className={!this.state.isLoadingPhoto ? "div-hidden" : "div-visible form-group"} >
                        <Cropper
                            style={{ height: 400, width: 400, overflow: 'hidden' }}
                            aspectRatio={1/1}
                            preview=".img-preview"  
                            guides={false}
                            src={this.state.src}
                            ref={cropper => { this.cropper = cropper; }}
                        />
                        <p></p>
                        <button type="button" onClick={this.cropImage} className="btn btn-primary">Crop Image</button>
                    </div>
                </Row>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-info btn-block" disabled={isLoading}><span className="glyphicon glyphicon-send"></span>Register</button>
                </div>
            </form>);
            return (
                this.state.done ?
                    <Redirect to="/" /> : form
            );
    }
} 

RegisterForm.propTypes =
    {
        register: PropTypes.func.isRequired
    }

 export default connect(null, { register })(RegisterForm);