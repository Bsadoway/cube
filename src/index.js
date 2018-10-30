import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BasicGrid from './components/BasicGrid';
import appV2 from './components/v2/appV2';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/basic" component={BasicGrid} />
        <Route path="/v2" component={appV2} />
      </div>
    </Router>
  )


ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
