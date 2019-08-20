import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import LoginPage from "./components/auth/login/LoginPage";
import RegisterPage from './components/auth/register/RegisterPage';
import UserPage from "./components/auth/userProfile/UserPage";
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import ResestPasswordPage from './components/auth/ResetPasswordPage';
import UserListPage from  './components/auth/userlist/UserListPage';
import UserListUIPage from './components/auth/userlistUI/UserListUIPage';
import Facebook from './components/auth/facebook'
import Google from './components/auth/google';
import Hotel from './components/hotel';
import HotelPage from './components/hotel/HotelPage';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path="/login" component={LoginPage} />
    <Route path='/register' component={RegisterPage} />
    <Route path="/forgotpassword" component={ForgotPasswordPage} />
    <Route path="/resetpassword" component={ResestPasswordPage} />
    <Route path="/user" component={UserPage} />
    <Route path="/users" component={UserListPage} /> 
    <Route path="/usersUI" component={UserListUIPage} /> 
    <Route path="/facebook" component={Facebook} /> 
    <Route path="/google" component={Google} /> 
    <Route path="/hotels" component={Hotel} /> 
    {/* <Route path="/hotelpage" component={HotelPage} /> */}
    <Route path="/views/:country/:id" component={HotelPage} /> 

  </Layout>
);
