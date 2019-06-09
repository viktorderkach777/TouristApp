import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { login } from "../../../actions/authActions";

//import GoogleLogin from 'react-google-login';
//import FacebookLogin from 'react-facebook-login';
import validateemail from '../../../helpers/validateEmail'; 

class LoginForm extends Component {
  
  /*constructor(props)	
  {	
    super(props);
  }*/

  state = {
    email: '',
    password: '',
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
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    let errors = {};
    if (!validateemail(this.state.email)) errors.email = "Enter valid email"
    if (this.state.email === '') errors.email = "Can't be empty!"
    if (this.state.password === '') errors.password = "Can't be empty!"

    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      const { email, password } = this.state;
      this.setState({ isLoading: true });
      this.props.login({ Email: email, Password: password })
        .then(
          () => this.setState({ done: true }),
          (err) => this.setState({ errors: err.response.data, isLoading: false })
        );
    }
    else {
      this.setState({ errors });
    }

  }

     render() {
    const { errors, isLoading } = this.state;
    console.log('---FormLogin state----', this.state);
      const form = (
      <React.Fragment>
        <form onSubmit={this.onSubmitForm}>
          <h1 className="text-center">Login</h1>

          {!!errors.invalid ?
            <div className="alert alert-danger">
              {errors.invalid}.
                    </div> : ''}

          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="text"
              className={classnames('form-control', { 'is-invalid': !!errors.email})}
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange} />
            {!!errors.email ? <span className="help-block">{errors.email}</span> : ''}
          </div>

          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password"
              className={classnames('form-control', { 'is-invalid': !!errors.password})}
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange} />
            {!!errors.password ? <span className="help-block">{errors.password}</span> : ''}
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-info btn-block" disabled={isLoading}><span className="glyphicon glyphicon-send"></span> Login</button>
          </div>
        </form>
        
      </React.Fragment>
      );
      return ( this.state.done ? <Redirect to="/" /> : form );
    }
} 

LoginForm.propTypes =
  {
    login: PropTypes.func.isRequired
  }
  export default connect(null, {login})(LoginForm);