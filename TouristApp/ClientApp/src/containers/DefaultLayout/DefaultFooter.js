import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row" style={{ paddingTop: '20px' }}>
            <div className="col-sm">
              <Link to="/" className="nav-link">Правила використання сайта</Link>
              <Link to="/" className="nav-link">Конфінденційність</Link>
              <Link to="/" className="nav-link">Бонусна програма</Link>
            </div>
            <div className="col-sm">
              <Link to="/" className="nav-link">Контакти</Link>
              <Link to="/" className="nav-link">Як працює сайт</Link>
              <Link to="/" className="nav-link">Правила проведення конкурсів</Link>
            </div>
            <address>
              <div className="col-sm" style={{ margin: '5px' }}>
                <a className="contact-phone" href="tel:+380950173999"> <i className="icon-phone"></i>&nbsp; +38 (095) 01 73 999</a>
                <br />
                <a className="contact-phone" href="tel:+380950173999"> <i className="icon-phone"></i>&nbsp; +38 (095) 01 73 999</a>
                <br />
                <span>м. Рівне, вул. Соборна, 99</span>
                <br />
                <a className="contact-email" target="blank" href="mailto:touristapp@gmail.com">TouristApp@gmail.com</a>
                <p>
                <Button style={{ marginRight: '5px' }} className="btn-facebook btn-brand icon"><i className="fa fa-facebook"></i></Button>
                <Button style={{ marginRight: '5px' }} className="btn-twitter btn-brand icon"><i className="fa fa-twitter"></i></Button>
                <Button className="btn-instagram btn-brand icon"><i className="fa fa-instagram"></i></Button>
                </p>
              </div>
            </address>
            <div className="col-md-12">
                <p className="text-center">Ціни, зазначені на сайті, можуть змінитися і не є публічною офертою.</p>
            </div>
            <div>
            <span><a href="https://coreui.io">CoreUI</a> &copy; 2019 RIVNE STEP.</span>

            <span className="text-center"> Powered by group of Step Academy students </span>
            </div>
          </div>
        </div>
        
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
