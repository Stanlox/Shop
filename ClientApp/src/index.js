import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Auth0Provider } from '../src/components/Auth';
import config from './components/auth_config.json';
import { Provider } from 'react-redux';
import configureStore from './store/store';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const store = configureStore({});

const onRedirectCallback = appState => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
    );
};

ReactDOM.render(
    <Auth0Provider domain={config.domain} client_id={config.clientId} redirect_url={window.location.origin} onRedirectCallback={onRedirectCallback}>
        <BrowserRouter basename={baseUrl}>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </Auth0Provider>
    ,
  rootElement);

registerServiceWorker();

