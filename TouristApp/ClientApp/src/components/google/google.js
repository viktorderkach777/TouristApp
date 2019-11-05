import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import get from 'lodash.get';
import PropTypes from 'prop-types';
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

class Google extends Component {
    state = {        
        loading: false
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        return { loading: nextProps.loading, errorsServer: nextProps.errors };
    }

    render() {  
        const { errorsServer, loading } = this.state;
        
        const responseGoogle = (response) => {            
            const model = {
                TokenId: response.Zi.id_token
            };            
            this.props.login(model);            
        }
          
        const form = (
            <React.Fragment>
                {!!errorsServer.invalid ?
                    <div className="invalid-feedback d-block">
                        {errorsServer.invalid}
                    </div> : ''}
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    render={renderProps => (
                        <Button onClick={renderProps.onClick} style={{ backgroundColor: "red", color: "white", zIndex: "0" }} className="btn-google-plus  mb-1" block><span>Enter with Google</span></Button>
                    )}
                />
                <CentrPageSpinner loading={loading} />
            </React.Fragment>
        );

        return form;
    }
};

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
            dispatch(loginActions.googleLoginPost(model))
    }
};

Google.propTypes = propTypes;
Google.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Google)