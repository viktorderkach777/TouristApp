import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Redirect } from 'react-router-dom';
import { facebook_enter } from '../../../actions/authActions';
import { connect } from "react-redux";
import { REACT_APP_FACEBOOK_CLIENT_ID } from '../config.js';
import { FacebookLoginButton } from "react-social-login-buttons";

class Facebook extends Component {
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

        const responseFacebook = (response) => {            

            this.setState({ isLoading: true });
            this.props.facebook_enter({ accessToken: response.accessToken })
                .then(
                    () => this.setState({ done: true }),
                    (err) => this.setState({ errors: err.response.data, isLoading: false })
                );
        }

        //const { errors, isLoading } = this.state;        
        const form = (
            <React.Fragment>
                <FacebookLogin
                    appId={REACT_APP_FACEBOOK_CLIENT_ID}
                    autoLoad={false}
                    fields="name,email,picture,first_name,last_name"
                    callback={responseFacebook}

                    render={renderProps => (
                        <FacebookLoginButton onClick={renderProps.onClick} />
                    )}
                />
            </React.Fragment>
        );

        return (this.state.done ? <Redirect to="/" /> : form);
    }
}
export default connect(null, { facebook_enter })(Facebook);