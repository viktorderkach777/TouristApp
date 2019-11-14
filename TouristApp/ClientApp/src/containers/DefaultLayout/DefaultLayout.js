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

class DefaultLayoutContainer extends Component {

  //loading = () => <CentrPageSpinner loading={loading} />

  signOut(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    //console.log("DefaultLayoutContainer props", this.props);
    const { isAuthenticated, user } = this.props.auth;
    const { roles } = this.props.auth.user;
    var isAccess = false;
    const { loading } = this.props.loading;

    if (isAuthenticated === true) {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === "User") {
          isAccess = true;
          break;
        }
      }
    }

    const form = (
      <React.Fragment>
        <div className="app">
          <AppHeader fixed >
            <Suspense fallback={<CentrPageSpinner loading={true} />}>
              <DefaultHeader onLogout={e => this.signOut(e)} user={user} loading={loading} />
            </Suspense>
          </AppHeader>
          <div className="app-body">

            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>

            <main className="main">
              <AppBreadcrumb appRoutes={routes} router={router} />
              <Container fluid>
                <Suspense fallback={<CentrPageSpinner loading={true} />}>
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
              <Suspense fallback={<CentrPageSpinner loading={true} />}>
                <DefaultAside />
              </Suspense>
            </AppAside>
          </div>

          <AppFooter>
            <Suspense fallback={<CentrPageSpinner loading={true} />}>
              <DefaultFooter />
            </Suspense>
          </AppFooter>
        </div>
      </React.Fragment>
    );
    return (!isAccess ? <Redirect to="/login" /> : form);
  }
}

// DefaultLayoutContainer.defaultprops = {
//   loading: true
// }

DefaultLayoutContainer.propTypes =
  {
    auth: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

const mapStateToProps = state => {
  return {
    auth: get(state, 'login'),
    loading: get(state, 'refreshToken.loading')
  };
};

const DefaultLayout =
  connect(mapStateToProps, { logout })(DefaultLayoutContainer);
export default DefaultLayout;
