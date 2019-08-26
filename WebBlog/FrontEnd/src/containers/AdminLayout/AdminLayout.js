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
import routes from '../../routes/adminroutes';

const AdminAside = React.lazy(() => import('./AdminAside'));
const AdminFooter = React.lazy(() => import('./AdminFooter'));
const AdminHeader = React.lazy(() => import('./AdminHeader'));

class AdminLayoutContainer extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login')
  }

  render() {
    const { roles, isAuthenticated } = this.props;
    var isAccess = false;

    if (isAuthenticated === true) {
      if (roles === "Admin") {
        isAccess = true;
        console.log('AdminLayout access: ', isAccess);
      }
    }
    const form = (
        <React.Fragment>
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <AdminHeader onLogout={e=>this.signOut(e)}/>
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
            <AppBreadcrumb appRoutes={routes} router={router}/>
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
                  <Redirect from="/" to="/admin/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <AdminAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <AdminFooter />
          </Suspense>
        </AppFooter>
      </div>
      </React.Fragment>
    );
    return (!isAccess ? <Redirect to="/login" /> : form);
  }
}

AdminLayoutContainer.propTypes =
  {
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
    roles: PropTypes.string.isRequired
  }

const mapStateToProps = state => {
  return {
    isAuthenticated: get(state, 'auth.isAuthenticated'),
    roles: get(state, 'auth.user.roles')
  };
};

const mapDispatch = dispatch => {
  return {
     logout: () =>
          dispatch(userAction.logout())

  };
};

const AdminLayout =
  connect(mapStateToProps, mapDispatch)(AdminLayoutContainer);

export default AdminLayout;
