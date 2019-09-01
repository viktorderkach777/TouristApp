import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
//import axios from 'axios';
import { google_enter } from '../../reducers/auth';
import { connect } from "react-redux";
//import { REACT_APP_GOOGLE_CLIENT_ID } from '../config.js';
//import { GoogleLoginButton } from "react-social-login-buttons";
import CentrPageSpinner from "../CentrPageSpinner";

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

            console.log("responce", response);

            this.setState({ isLoading: true });
            this.props.google_enter({ TokenId: response.Zi.id_token })
                .then(
                    () => this.setState({ done: true }),
                    (err) => this.setState({ errors: err.response.data, isLoading: false })
                );
        }

        const { isLoading } = this.state;
        //const REACT_APP_GOOGLE_CLIENT_ID = '703221485807-04v3j6tfmjoc09ugqv20c1q555u1clrl.apps.googleusercontent.com';  
        const form = (
            <React.Fragment>
                <GoogleLogin
                    clientId={'982945294987-u24uqvngod3fv1k4na7u3qemb8mup3sg.apps.googleusercontent.com'}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    render={renderProps => (
                        <Button onClick={renderProps.onClick} style={{ backgroundColor: "red", color: "white",zIndex:"0" }} className="btn-google-plus  mb-1" block><span>Enter with Google</span></Button>
                        // <GoogleLoginButton  />
                    )}
                />
                <CentrPageSpinner loading={isLoading} />
            </React.Fragment>
        );
        return (this.state.done ? <Redirect to="/tours" /> : form);
    }


   
};

const mapDispatchToProps = dispatch => {
    return {
        google_enter: async (model) =>
            dispatch(await google_enter(model))

    }
};



export default connect(null, mapDispatchToProps)(Google)