import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux'
import get from 'lodash.get';
import PropTypes from 'prop-types';
//import * as userAction from '../../reducers/auth';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
   AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes/routes';

import { logout } from '../../views/Pages/Login/reducer';
const CentrPageSpinner = React.lazy(() => import('../../components/CentrPageSpinner'));

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const ChatBtn = React.lazy(() => import('../../components/chatButton'));

class DefaultLayoutContainer extends Component {

  loading = () => <CentrPageSpinner loading/>//<div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { roles } = this.props.auth.user;//||"User";
    var isAccess = false;
    const {loading} = this.props.loading;
    //console.log('DefaultLayout props: ', this.props);


    if (isAuthenticated === true) {
      for(let i=0;i<roles.length;i++)
      {
        if(roles[i]==="User")
        {
          isAccess = true;
          break;
        }
      }
    }

    const form = (
      <React.Fragment>
        <div className="app">
          <AppHeader fixed >
            <Suspense fallback={this.loading()}>
              <DefaultHeader onLogout={e => this.signOut(e)} user={user} loading={loading}/>
            </Suspense>
          </AppHeader>
          <div className="app-body">
          <ChatBtn/>>
            <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>

            <main className="main">
              <AppBreadcrumb appRoutes={routes} router={router} />
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} />
                          )} />
                      ) : (null);
                    })}
                    <Redirect from="/" to="/tours" />
                  </Switch>
                </Suspense>
              </Container>
            </main>
            <AppAside fixed>
              <Suspense fallback={this.loading()}>
                <DefaultAside />
              </Suspense>
            </AppAside>
          </div>

          <AppFooter>
            <Suspense fallback={this.loading()}>
              <DefaultFooter />
            </Suspense>
          </AppFooter>
        </div>
      </React.Fragment>
    );
    return (!isAccess ? <Redirect to="/login" /> : form);
  }
}

DefaultLayoutContainer.propTypes =
  {
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
    // isAuthenticated:PropTypes.bool.isRequired,
    // roles: PropTypes.string.isRequired
  }

const mapStateToProps = state => {
  return {
    //auth: get(state, 'auth'),
    auth: get(state, 'login'),
    loading: get(state, 'refreshToken.loading')
    // isAuthenticated: get(state, 'auth.isAuthenticated'),
    // roles: get(state, 'auth.user.roles')
  };
};



const DefaultLayout =
  connect(mapStateToProps, {logout})(DefaultLayoutContainer);
export default DefaultLayout;
