import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { facebook_enter } from '../../reducers/auth';
import { connect } from "react-redux";
//import { REACT_APP_FACEBOOK_CLIENT_ID } from '../config.js';
import CentrPageSpinner from "../CentrPageSpinner";

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
            console.log("facebook", response);
            this.setState({ isLoading: true });
            this.props.facebook_enter({ accessToken: response.accessToken })
                .then(
                    () => this.setState({ done: true }),
                    (err) => this.setState({ errors: err.response.data, isLoading: false })
                );
        }

        const { isLoading } = this.state;
        const REACT_APP_FACEBOOK_CLIENT_ID ='880476432333688';        
        const form = (
            <React.Fragment>
                <FacebookLogin
                    appId={REACT_APP_FACEBOOK_CLIENT_ID}
                    autoLoad={false}
                    fields="name,email,picture,first_name,last_name"
                    callback={responseFacebook}

                    render={renderProps => (
                        //<FacebookLoginButton onClick={renderProps.onClick} />
                        <Button onClick={renderProps.onClick} className="btn-facebook mb-1" block><span>Enter with Facebook</span></Button>
                    )}
                />
                <CentrPageSpinner loading={isLoading} />
            </React.Fragment>
        );

        return (this.state.done ? <Redirect to="/tours" /> : form);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        facebook_enter: async (model) =>
            dispatch(await facebook_enter(model))

    }
};

export default connect(null, mapDispatchToProps)(Facebook);