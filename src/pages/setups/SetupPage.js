import React from 'react';
import {TabsPage} from '../TabsPage';
import {SetupCompany} from './SetupCompany';
import {SetupCurrentPlan} from './SetupCurrentPlan';

export class SetupPage extends TabsPage {
    constructor(props) {
        super(props);
        this.state.subTitle = 'Setup Cautionem Application'
    }

    getSectionTitle(tab) {
        return 'Settings off ' + tab.content + ':'
    }

    tabs() {
        const tabs = [
            {
                id: 'setup-company-tab',
                content: 'Company',
                body: <SetupCompany/>
            }, {
                id: 'setup-plan-tab',
                content: 'Current Plan',
                body: <SetupCurrentPlan/>
            }
        ];

        return tabs
    }
}
