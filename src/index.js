import React from 'react';
import ReactDOM from 'react-dom';
import { Route,  HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentQuery from './pages/DocumentQuery';
import Orders from './pages/Orders';


const routing = (
    <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/home" component={home} />
      <Route path="/documents" component={DocumentQuery} />
      <Route path="/orders" component={Orders} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
