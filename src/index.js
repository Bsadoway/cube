import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BasicGrid from './components/BasicGrid';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/basic" component={BasicGrid} />
      </div>
    </Router>
  )


ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
