import React from 'react';
import {Card, TextStyle, Banner, Subheading, FormLayout, TextField, AccountConnection} from '@shopify/polaris';
import {BasePage} from "../BasePage";
import {HomePage} from "./HomePage";

export class InstallPage extends HomePage {
    constructor(props) {
        super(props);
        this.state.shopDomain = '';
        this.state.shopDomainError = 'Store domain is required.';
        this.state.subTitle = 'Install Cenit-Invoice application in your Shopify store:';

        this.handleChangeshopDomain = this.handleChangeshopDomain.bind(this);
        this.handleInstall = this.handleInstall.bind(this);
    }

    handleChangeshopDomain(value) {
        let error = false;

        if ( value === '' ) {
            error = 'Store domain is required.'
        } else if ( !value.match(/^([\wñáéíóú]+([\-\.][\wñáéíóú])?)+.+\.myshopify\.com$/i) ) {
            error = 'Invalid store domain.'
        }

        this.setState({ shopDomain: value, shopDomainError: error });
    }

    handleInstall() {
        open(window.location.href + '?shop=' + this.state.shopDomain, '_self')
    }

    renderInstall() {
        const { appContext, shopDomain, shopDomainError } = this.state;

        if ( appContext.settings.status === undefined ) {
        }
    }

    renderPageContent() {
        const { shopDomain, shopDomainError } = this.state;

        return (
            <div className={'install'}>
                <AccountConnection
                    title={
                        <TextField label="Enter your store's domain:" value={shopDomain} error={shopDomainError}
                                   placeholder="my-store-name.myshopify.com" onChange={this.handleChangeshopDomain}/>
                    }
                    action={{
                        content: 'Install', onAction: this.handleInstall, disabled: shopDomain === '' || shopDomainError
                    }}
                />

                {super.renderPageContent()}
            </div>
        );
    }
}