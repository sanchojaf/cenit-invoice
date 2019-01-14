import React from 'react';
import {Card, TextStyle, Banner, Subheading, FormLayout} from '@shopify/polaris';
import {BasePage} from "../BasePage";

export class HomePage extends BasePage {
    constructor(props) {
        super(props);
    }

    renderPageContent() {
        const
            baseHelpUrl = 'https://cenit-invoice.freshdesk.com/support/solutions/articles/',
            ordersHelpUrl = 'order-listing',
            invoicesHelpUrl = 'invoice-management';

        return (
            <Card sectioned title="Integrated Marketplace Connector">
                <FormLayout.Group>
                    <Banner icon="help" title={this.renderExternalLink('Orders', baseHelpUrl + ordersHelpUrl)}>
                        <Subheading><TextStyle variation="subdued">Order Listing</TextStyle></Subheading>
                        <p>.....</p>
                    </Banner>
                    <Banner icon="help" title={this.renderExternalLink('Invoices', baseHelpUrl + invoicesHelpUrl)}>
                        <Subheading><TextStyle variation="subdued">Invoices management</TextStyle></Subheading>
                        <p>.....</p>
                    </Banner>
                </FormLayout.Group>
            </Card>
        );
    }
}