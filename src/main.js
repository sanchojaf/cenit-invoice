import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

import './main.css';
import '@shopify/polaris/styles.css'

var queryParams = window.location.search,
    urlParams = new URLSearchParams(queryParams),
    appDomainName = window.location.hostname.split('.')[0],
    isLocal = appDomainName.match(/^(127.0|localhost)/i) != null,
    serverDomain = urlParams.has('serverDomain') ? urlParams.get('serverDomain') : 'cenit.io',
    settingsPath = urlParams.has('settingsPath') ? urlParams.get('settingsPath') : '/app/' + appDomainName + '.json',

    startApp = (appSettings) => {
        if ( appSettings && appSettings.status === 'unauthorized' ) {
            return window.open(appSettings.URIs.authorize, '_parent');
        }

        window.renderPage = function (page, data) {
            const domElement = document.getElementById('page-content');

            ReactDOM.render(<App page={page} data={data} appSettings={appSettings} isLocal={isLocal}/>, domElement);
        };

        renderPage(urlParams.has('pg') ? urlParams.get('pg') : 'home');
    };

if ( isLocal ) {
    queryParams = '?' + $.param({
        shop: 'cenit-invoice-develop.myshopify.com',
        timestamp: 1546964890,
        hmac: 'd1e36d08e3463c7703e1b210bec76f0cf0697e636b07c74f3d9715ab24b65da4'
    });
    settingsPath = '/app/cautionem-dev.json'
} else {
    window.sessionStorage.removeItem('order-items');
}

if ( queryParams ) {
    axios({
        url: 'https://' + serverDomain + settingsPath + queryParams,
    }).then((response) => {
        startApp(response.data.settings);
    }).catch((error) => {
        console.error(error);
        alert(error);
        startApp({ status: 'ready', plan: {}, plans_data: [] });
    });
} else {
    startApp({});
}