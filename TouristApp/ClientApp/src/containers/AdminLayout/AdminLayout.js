import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux'
import get from 'lodash.get';
import PropTypes from 'prop-types';
import { logout } from '../../views/Pages/Login/reducer';
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
//import Notifications from '../../Notifications'
const CentrPageSpinner = React.lazy(() => import('../../components/CentrPageSpinner'));

const AdminAside = React.lazy(() => import('./AdminAside'));
const AdminFooter = React.lazy(() => import('./AdminFooter'));
const AdminHeader = React.lazy(() => import('./AdminHeader'));
const Notifications = React.lazy(() => import('../../components/Notifications'));


class AdminLayoutContainer extends Component {

  loading = () => <CentrPageSpinner loading/>//<div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { roles, isAuthenticated } = this.props;
    var isAccess = false;

    if (isAuthenticated === true) {
      for(let i=0;i<roles.length;i++)
      {
        if(roles[i]==="Admin")
        {
          isAccess = true;
          break;
        }
      }
    }
    const form = (
        <React.Fragment>
          <Notifications/>
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
    roles: PropTypes.array.isRequired
  }

const mapStateToProps = state => {
  return {
    isAuthenticated: get(state, 'login.isAuthenticated'),
    roles: get(state, 'login.user.roles')
  };
};



const AdminLayout =
  connect(mapStateToProps, {logout})(AdminLayoutContainer);

export default AdminLayout;
