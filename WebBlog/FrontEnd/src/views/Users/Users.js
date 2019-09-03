import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import get from 'lodash.get';
import PropTypes from "prop-types";
import * as userAction from '../../reducers/user';
//import defaultPhoto from '../Pages/Register/default-user.png';



class UsersContainer extends Component {

  state = {
    redirect: false,
    loading: true
  };

  componentDidMount() {
    this.props.getUsers();
  }
  deleteUser = (e, id)  =>{
    e.preventDefault();
    console.log('delete user with:',id);
    this.props.deleteUser(id);
  }

  render() {

    const userList =this.props.users;
    console.log("--props UserListPage---", this.props);
    console.log("--userList:", userList);
    //const { loading } = this.state;
    return (
    <div className="animated fadeIn">
    <Row>
      <Col xl={6}>
        <Card>
          <CardHeader><i className="fa fa-align-justify"></i> Users</CardHeader>
          <CardBody>
            <Table responsive hover>
              <thead>
                <tr>
                  <th scope="col">photo</th>
                  <th scope="col">email</th>
                  <th scope="col">name</th>
                  <th scope="col">role</th>
                  <th scope="col">deleting</th>
                </tr>
              </thead>
              {/* <SpinnerWidget loading={loading} /> */}
              <tbody>
                {userList.map((user, index) =>
                <tr key={user.id.toString()}>
                <th scope="row"><img src={user.userImage} className="img-avatar" alt={user.email} style={{width:'50px'}}></img> </th>
                <td><Link to={`/admin/users/${user.id}`}>{user.email}</Link></td>
                <td><Link to={`/admin/users/${user.id}`}>{user.fullName}</Link></td>
                <td> {user.roles.map(item => (<span key={item.id}>{item.name} </span>))}</td>
                <td><Button color="primary" size="sm" onClick={e => this.deleteUser(e,user.id)}><i className="fa fa-trash" aria-hidden="true"/></Button></td>
              </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
  );
  }
}

UsersContainer.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapState = state => {
  return {
    users: get(state, 'userlist.list'),
    // isListLoading: get(state, 'tours.list.loading'),
    //   isListError: get(state, 'tours.list.error'),

  };
};
const mapDispatch = dispatch => {
  return {
      getUsers: () =>
        dispatch(userAction.getUsers()),
      deleteUser: (id) =>
        dispatch(userAction.deleteUser(id))
  };
};

const Users =
    connect(mapState, mapDispatch)(UsersContainer);

export default Users;
