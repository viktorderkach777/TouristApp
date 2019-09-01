import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { google_enter } from '../../reducers/auth';
import { connect } from "react-redux";
import CentrPageSpinner from "../CentrPageSpinner";

class Google extends Component {
    state = {
        errors: {
        },
        done: false,
        isLoading: false
    };

    render() {       
        const responseGoogle = (response) => {
            this.setState({ isLoading: true });
            this.props.google_enter({ TokenId: response.Zi.id_token })
                .then(
                    () => this.setState({ done: true }),
                    (err) => this.setState({ errors: err.response.data, isLoading: false })
                );
        }

        const { isLoading } = this.state;  
        const form = (
            <React.Fragment>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    render={renderProps => (
                        <Button onClick={renderProps.onClick} style={{ backgroundColor: "red", color: "white", zIndex: "0" }} className="btn-google-plus  mb-1" block><span>Enter with Google</span></Button>
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