import React from 'react';
import {FormLayout, TextField, FooterHelp, Card} from '@shopify/polaris';
import {Stack, TextStyle, Card, ResourceList, Pagination, Thumbnail, Badge} from '@shopify/polaris';
import {BaseComponent} from "../../common/BaseComponent";

export class SetupInvoices extends BaseComponent {
    constructor(props) {
        super(props);

        this.state.invoices = {};
        this.state.searchTerm = this.searchTerm;
        this.state.loading = true;

        this.state.helpUri = '#Invoices';

        setTimeout(this.handleSearch, this.searchPage);
    }

    handleSearch(page) {
        const
            uri = this.urlTo('invoices'),
            data = this.requestParams({
                term: this.state.searchTerm,
                page: page
            });

        this.loadingOn();
        $.getJSON(uri, data).done((response) => {
            this.setState({ invoices: response.invoices, loading: false, notifications: response.notifications });
            this.searchTerm = data.term;
            this.searchPage = data.page;

            let msg;

            if ( response.count === 0 ) {
                msg = 'No invoices found.';
            } else if ( response.count === 1 ) {
                msg = 'Only one invoice was found.';
            } else {
                msg = response.count + ' invoices were found.';
            }

            this.flashNotice(msg);
        }).fail((response) => {
            const error = response.responseJSON ? response.responseJSON.error : response.responseText;
            this.flashError('Failed to load the invoices list.' + error);
        }).always(() => this.loadingOff());
    }

    handleKeyPress(e) {
        if ( e.keyCode === 13 ) {
            e.preventDefault();
            this.setState({ page: 0 });

            return false;
        }
    }

    get searchSession() {
        return this.getSessionItem('setup-invoices-search', { term: '', page: 0 });
    }

    set searchSession(value) {
        this.setSessionItem('setup-invoices-search', value);
    }

    get searchTerm() {
        return this.searchSession.term;
    }

    set searchTerm(value) {
        const data = this.searchSession;

        data.term = value;
        this.searchSession = data
    }

    get searchPage() {
        return this.searchSession.page;
    }

    set searchPage(value) {
        const data = this.searchSession;

        data.page = value;
        this.searchSession = data
    }

    renderItem(item) {
        return (
            <ResourceList.Item
                id={item.invoice_id}
                media={this.image(item)}
                onClick={this.handleEdit}>
            </ResourceList.Item>
        );
    }

    renderFilter() {
        const { searchTerm } = this.state;

        return (
            <div style={{ margin: '10px' }} onKeyDown={this.handleKeyPress}>
                <ResourceList.FilterControl
                    searchValue={searchTerm}
                    onSearchChange={(searchTerm) => this.setState({ searchTerm })}
                    additionalAction={{ content: 'Search', onAction: () => this.handleSearch(0) }}
                />
            </div>
        );
    }

    renderWithAppContext(appContext) {
        const { loading, invoices } = this.state;

        if ( loading ) return this.renderLoading();

        const { items, page, pages, count } = invoices;

        return (
            <div className={'setup invoice'}>
                <Card sectioned>
                    <ResourceList
                        resourceName={{ singular: 'invoice', plural: 'invoices' }}
                        items={items}
                        hasMoreItems={true}
                        renderItem={this.renderItem}
                        filterControl={this.renderFilter()}
                    />

                    <Card sectioned>
                        <Stack distribution="fill" wrap="false">
                            <TextStyle variation="subdued">Page {page} of {pages} for {count} invoices:</TextStyle>
                            <Stack distribution="trailing" wrap="false">
                                <Pagination
                                    hasPrevious={page > 1}
                                    onPrevious={() => this.handleSearch(page - 1)}
                                    hasNext={page < pages}
                                    onNext={() => this.handleSearch(page + 1)}
                                />
                            </Stack>
                        </Stack>
                    </Card>
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
