import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
//import axios from 'axios';
import { google_enter } from '../../../actions/authActions';
import { connect } from "react-redux";
import { REACT_APP_GOOGLE_CLIENT_ID } from '../config.js';
import { GoogleLoginButton } from "react-social-login-buttons";


class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
      },
      done: false,
      isLoading: false
    };
  }

  render() {

    const responseGoogle = (response) => {      

      // axios.post('https://localhost:44318/api/googleauth/google', { AccessToken: response.Zi.id_token })
      // .then(res => {
      //   console.log(res);
      //   console.log("--id_token--",res.Zi.id_token);
      // })

      this.setState({ isLoading: true });
      this.props.google_enter({ TokenId: response.Zi.id_token })
        .then(
          () => this.setState({ done: true }),
          (err) => this.setState({ errors: err.response.data, isLoading: false })
        );
    }

    //const { errors, isLoading } = this.state;    
    const form = (
      <React.Fragment>
              <GoogleLogin
                clientId={REACT_APP_GOOGLE_CLIENT_ID}                
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (                  
                  <GoogleLoginButton onClick={renderProps.onClick} />
                )}                                                                     
        />                 
      </React.Fragment>
    );    
    return (this.state.done ? <Redirect to="/" /> : form);
  }
}
export default connect(null, { google_enter })(Google);