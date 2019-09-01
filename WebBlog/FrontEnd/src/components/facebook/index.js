import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { facebook_enter } from '../../reducers/auth';
import { connect } from "react-redux";
import CentrPageSpinner from "../CentrPageSpinner";

class Facebook extends Component {
    state = {
        errors: {
        },
        done: false,
        isLoading: false
    };

    render() {
        const responseFacebook = (response) => {           
            this.setState({ isLoading: true });
            this.props.facebook_enter({ accessToken: response.accessToken })
                .then(
                    () => this.setState({ done: true }),
                    (err) => this.setState({ errors: err.response.data, isLoading: false })
                );
        }

        const { isLoading } = this.state;                
        const form = (
            <React.Fragment>
                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                    autoLoad={false}
                    fields="name,email,picture,first_name,last_name"
                    callback={responseFacebook}

                    render={renderProps => (                       
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