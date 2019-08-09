import React, { Component } from 'react';
//import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
//import {PostData} from '../../services/PostData';
//import { Redirect } from 'react-router-dom';
//import axios from 'axios';
//import { facebook_enter } from '../../../actions/authActions';
//import { connect } from "react-redux";


class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
      },
      done: false,
      isLoading: false
    };
    //this.signup = this.signup.bind(this);
  }



  render() {


    const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);


      // this.setState({ isLoading: true });
      // this.props.facebook_enter({ accessToken: response.accessToken })
      //     .then(
      //         () => this.setState({ done: true }),
      //         (err) => this.setState({ errors: err.response.data, isLoading: false })
      //     );
    }

    const { errors, isLoading } = this.state;
    console.log('---FormLogin state----', this.state);
    const form = (
      <React.Fragment>

        <div className="row body">
          <div className="medium-12 columns">
            <div className="medium-12 columns">



              <GoogleLogin
                clientId="703221485807-04v3j6tfmjoc09ugqv20c1q555u1clrl.apps.googleusercontent.com"                
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle} />

            </div>
          </div>

        </div>
      </React.Fragment>
    );
    return form;
    // return (this.state.done ? <Redirect to="/" /> : form);
  }
}
//export default connect(null, { facebook_enter })(Facebook);
export default Google;