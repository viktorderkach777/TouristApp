import React, { Component } from 'react';
import classnames from 'classnames';
import './index.css';

class SpinnerWidgetContainer extends Component {
    state = {
        loading: true
    }
    render() {
        const { loading } = this.props;
        return (
            <div className={classnames('spinnermodal', { 'open': loading })}>
                <div className="position-center">
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}
const CentralPageSpinner = SpinnerWidgetContainer;
export default CentralPageSpinner;