import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row } from 'react-bootstrap';
import UserCard from "./UserCard";

class UserList extends Component {
  state = {};
  
  render() {
    
    console.log("--USerList props--", this.props);
    const { users } = this.props;
    const emptyMessage = <p>Список пустий</p>;
    const usersList = (
      <Row className="display: flex; flex-direction: column;">
        {users.map(item => (
          <UserCard user={item} key={item.id} />
        ))}
      </Row>
    );
    return <div>{users.length === 0 ? emptyMessage : usersList}</div>;
  }
}

UserList.propTypes = {
  users: PropTypes.func.isRequired
};

export default UserList;