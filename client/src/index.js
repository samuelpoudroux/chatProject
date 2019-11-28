import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'antd/dist/antd.css';
import routes from './routes';

import jwt_decode from 'jwt-decode';
import setAuthToken from './services/setAuthToken'
import { setCurrentUser, logoutUser } from './store/actions/user/login';

// if(localStorage.jwtToken) {
//   setAuthToken(localStorage.jwtToken);
//   const decoded = jwt_decode(localStorage.jwtToken);
//   store.dispatch(setCurrentUser(decoded));

//   const currentTime = Date.now() / 1000;
//   console.log(Date.now())
//   if(decoded.exp < currentTime) {
//     store.dispatch(logoutUser());
//     window.location.href = '/login'
//   }
// }

render(
    <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {routes.map(route => (
          <Route key={route.name} exact path={route.path} component={route.component} />
        ))}
      </Switch>
    </BrowserRouter>
  </Provider>,
        document.getElementById('root')
);
