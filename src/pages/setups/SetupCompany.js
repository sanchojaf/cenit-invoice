import React from 'react';
import {FormLayout, TextField, FooterHelp, Card} from '@shopify/polaris';
import {BaseComponent} from "../../common/BaseComponent";

export class SetupCompany extends BaseComponent {
    constructor(props) {
        super(props);

        this.state.sending = false;
        this.state.helpUri = '#Company';

        this.handleChangeAttr = this.handleChangeAttr.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChangeAttr(attr) {
        return (value) => {
            this.setState((prevState) => {
                prevState.appContext.settings.company[attr] = value;

                return prevState;
            })
        }
    }

    handleSave(e) {
        console.log('TODO: ...');
    }

    renderAttributes(appContext) {
        const company = appContext.settings.company;

        return (
            <div className="attributes">
                <FormLayout>
                    <TextField label="Company name" value={company.name}
                               onChange={this.handleChangeAttr('name')}/>
                    <TextField label="Address" value={company.address}
                               onChange={this.handleChangeAttr('address')}/>
                    <FormLayout.Group>
                        <TextField label="Zip code" value={company.zip_code}
                                   onChange={this.handleChangeAttr('zip_code')}/>
                        <TextField label="Number" value={company.number}
                                   onChange={this.handleChangeAttr('number')}/>
                        <TextField label="eMail" value={company.email}
                                   onChange={this.handleChangeAttr('email')}/>
                    </FormLayout.Group>
                </FormLayout>
            </div>
        )
    }

    renderWithAppContext(appContext) {
        return (
            <div className={'setup company'}>
                <Card sectioned primaryFooterAction={{ content: 'Save', onAction: this.handleSave }}>
                    {this.renderAttributes(appContext)}
                </Card>
                <FooterHelp>
                    {'Learn more about '}
                    {this.renderExternalLink('company', this.state.helpUri)}
                    {' settings.'}
                </FooterHelp>
            </div>
        )
    }
}
