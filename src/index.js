import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createHashHistory from 'history/createHashHistory';

import App from './App';
import initializeStore from './initializeStore';
import * as serviceWorker from './serviceWorker';

const store = initializeStore();

const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} >
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
