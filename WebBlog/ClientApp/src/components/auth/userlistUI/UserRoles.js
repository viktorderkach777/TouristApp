import React, { Component } from "react";
import PropTypes from 'prop-types';

class UserRoles extends Component {
  
    state = {};

    render(){
        const { role } = this.props;
        console.log("--Role in props--", this.props);

  return (
    <span> {role.name}</span>
  );

  }

} 

UserRoles.propTypes = {
    role: PropTypes.object.isRequired
  };

  export default UserRoles;