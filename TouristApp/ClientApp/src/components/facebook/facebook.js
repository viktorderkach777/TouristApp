import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Button } from 'reactstrap';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import CentrPageSpinner from "../CentrPageSpinner";
import * as loginActions from '../../views/Pages/Login/reducer';

const propTypes = {
    login: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    failed: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
};

const defaultProps = {};

class Facebook extends Component {
    state = {
        loading: false
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        return { loading: nextProps.loading, errorsServer: nextProps.errors };
    }

    render() {
        const { errorsServer, loading } = this.state;

        const responseFacebook = (response) => {            
            const model = {
                accessToken: response.accessToken
            };
            this.props.login(model);           
        }
                      
        const form = (
            <React.Fragment>
                {!!errorsServer.invalid ?
                    <div className="invalid-feedback d-block">
                        {errorsServer.invalid}
                    </div> : ''}
                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                    autoLoad={false}
                    fields="name,email,picture,first_name,last_name"
                    callback={responseFacebook}

                    render={renderProps => (
                        <Button onClick={renderProps.onClick} className="btn-facebook mb-1" block><span>Enter with Facebook</span></Button>
                    )}
                />
                <CentrPageSpinner loading={loading} />
            </React.Fragment>
        );

        return form;
    }
}

const mapStateToProps = (state) => {
    return {
        loading: get(state, 'login.post.loading'),
        failed: get(state, 'login.post.failed'),
        success: get(state, 'login.post.success'),
        errors: get(state, 'login.post.errors'),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (model) =>
            dispatch(loginActions.facebookLoginPost(model))
    }
};

Facebook.propTypes = propTypes;
Facebook.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Facebook);