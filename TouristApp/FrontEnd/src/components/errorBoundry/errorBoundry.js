import React, { Component } from 'react';
//import ErrorIndicator from '../error-indicator';

const ErrorIndicator = React.lazy(() => import('../errorIndicator'));


class ErrorBoundry extends Component {
    state = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }
        return this.props.children;
    }
}

export default ErrorBoundry;