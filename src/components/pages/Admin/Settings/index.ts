import {html} from '@polymer/lit-element';
import {getMe} from 'actions/Me';
import Router, {RouterProps, Route} from 'lib/Router';
import {component} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {Me} from 'store/state';
import CSS from './page-settings-css';

interface props {
    me?: Me;
}

@component('page-admin')
export default class PageAdmin extends connect(store)(Router) implements props {
    me?: Me;

    routes: Route[] = [
        {path: '/404', element: 'page-not-found', exact: true},
        {path: '/', element: 'page-dashboard', exact: true},
        {path: '/users', element: 'page-users'},
        {path: '/brokers', element: 'page-resource', attributes: {resource: 'broker'}}
    ];

    notfound = 'page-not-found';

    _stateChanged(s: State) {
        this.me = s.Me;
    }
    _firstRendered() {
        store.dispatch<any>(getMe());
    }

    _render(props: RouterProps) {
        const page = super._render(props);

        return html`
            ${CSS}
            <ui-sidebar></ui-sidebar>
            <ui-header></ui-header>
            <main>${page}</main>
        `;
    }
}
