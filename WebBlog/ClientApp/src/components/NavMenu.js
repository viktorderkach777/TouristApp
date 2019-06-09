import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';
import './NavMenu.css';
import logo from './calculation.png';

import { withRouter } from 'react-router-dom';
//import { LinkContainer } from "react-router-bootstrap";





class NavMenu extends React.Component {
  state = {}

  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }
  /*
  constructor (props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

*/

  render () {
    const { isAuthenticated,user } = this.props.auth;
    
    const logoutLink = (
      <NavItem onClick={this.logout.bind(this)}>
        <NavLink tag={Link} className="text-dark" to="/"><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
      </NavItem>
    );

    const userLink = (
      <NavItem>
        <NavLink tag={Link} className="text-dark" to="/user">
        <i className="fas fa-user"></i>{user.name}</NavLink>
      </NavItem>
    );

    const loginLink = (
      <NavItem>
        <NavLink tag={Link} className="text-dark" to="/login"><i className="fas fa-sign-in-alt"></i> Login</NavLink>
      </NavItem>
    );
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
          <Container>
          <NavbarBrand tag={Link} to="/">
          <img src={logo} className="App-logo" alt="logo" />
          
          </NavbarBrand>
            <h2> MyCalculation </h2>
           
         
          <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
              <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/users"><i className="fas fa-users"></i> Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/usersUI"><i className="fas fa-users"></i> Users Ui</NavLink>
              </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/"><i className="fas fa-home"></i> Home</NavLink>
                </NavItem>
                
                {isAuthenticated ? userLink : ''}
                {isAuthenticated ? logoutLink : loginLink}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
NavMenu.propTypes =
  {
    logout: PropTypes.func.isRequired
  }

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default withRouter(connect(mapStateToProps, { logout })(NavMenu));
