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
