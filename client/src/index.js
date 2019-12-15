import React,{useState, useEffect} from 'react';
import {render} from 'react-dom';
import SocketContext from './socket-context'
import * as io from 'socket.io-client'
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'antd/dist/antd.css';
import routes from './routes';
import jwt_decode from 'jwt-decode';
import setAuthToken from './services/setAuthToken';
import {setCurrentUser, logoutUser} from './store/actions/user/login';


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

var socket = io('https://samchatapp.herokuapp.com/')
;

window.addEventListener('load', function (e) {
  console.log('load')
  e.preventDefault();
});


window.addEventListener('beforeunload', function (e) {
  console.log('beforeUnload')
  e.preventDefault();
  socket.emit('disconnect')
  socket.off()
  // window.location.href = '/login';
});

// const [reload, setReload] = useState(false)

// useEffect(() => {
//   socket.on('disconnect', () => {
//     setReload(!reload)
//   })
// }, [])

render(
  <SocketContext.Provider value={socket}>
    <Provider store={store}>
      <BrowserRouter >
      {console.log('apprender')}
        <Switch>
          {routes.map((route) => (
            <Route key={route.name} exact path={route.path} component={route.component} />
          ))}
        </Switch>
      </BrowserRouter>
    </Provider>
    </SocketContext.Provider>,

    document.getElementById('root'),
);
