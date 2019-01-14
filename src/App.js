import React, {Component} from 'react'
import {AppProvider} from '@shopify/polaris'
import {HomePage} from './pages/home/HomePage'
import {InstallPage} from './pages/home/InstallPage'
import {SetupPage} from './pages/setups/SetupPage'
import {AppContext} from './common/AppContext'

export class App extends Component {
    render() {
        const { appSettings, isLocal } = this.props;
        const appContext = { settings: appSettings };

        return (
            <AppProvider apiKey={isLocal ? null : appSettings.api_key}
                         shopOrigin={'https://' + appSettings.shop_domain}
                         forceRedirect={false}>
                <AppContext.Provider value={appContext}>{this.renderPage(appContext)}</AppContext.Provider>
            </AppProvider>
        )
    }

    renderPage(appContext) {
        if (appContext.settings.status === undefined) return <InstallPage/>;

        let { page, data } = this.props;

        data = data || {};

        switch ( page ) {
            case 'home':
                return <HomePage/>;
            case 'setup':
                return <SetupPage selectedTabIndex={data.selectedTabIndex || 0}/>;
        }
    }
}