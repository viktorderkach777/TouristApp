import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux'
import get from 'lodash.get';
import PropTypes from 'prop-types';
import * as userAction from '../../reducers/auth';

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

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayoutContainer extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login')
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { roles } = this.props.auth.user||"User";
    var isAccess = false;

    if (isAuthenticated === true) {
      if (roles === "User") {
        isAccess = true;
        console.log('DefaultLayout access: ', isAccess);
      }
    }

    const form = (
      <React.Fragment>
        <div className="app">
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DefaultHeader onLogout={e => this.signOut(e)} user={user} />
            </Suspense>
          </AppHeader>
          <div className="app-body">

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
    auth: get(state, 'auth')
    // isAuthenticated: get(state, 'auth.isAuthenticated'),
    // roles: get(state, 'auth.user.roles')
  };
};

const mapDispatch = dispatch => {
  return {
    logout: () =>
      dispatch(userAction.logout())

  };
};

const DefaultLayout =
  connect(mapStateToProps, mapDispatch)(DefaultLayoutContainer);
export default DefaultLayout;
