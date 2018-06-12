import {html} from '@polymer/lit-element';
import {component} from 'polymer3-decorators';
import Router, {RouterProps} from 'lib/Router';

@component('page-admin')
export default class PageAdmin extends Router {
    routes = {
        '/': 'page-dashboard',
        '/users': 'page-users'
    };

    notfound = 'page-not-found';

    _render(props: RouterProps) {
        const page = super._render(props);
        return html`
            <ui-sidebar></ui-sidebar>
            <ui-header></ui-header>
            <main>${page}</main>
        `;
    }
}
