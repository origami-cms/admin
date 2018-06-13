import {html} from '@polymer/lit-element';
import Router, {RouterProps} from 'lib/Router';
import {component} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import CSS from './page-users-css';

export * from './List/PageUsersList';
export * from './Create/PageUserCreate';


interface props {
}

@component('page-users')
export default class PageUsers extends connect(store)(Router) implements props {
    routes = [
        {path: '/users', element: 'page-users-list', exact: true},
        {path: '/users/create', element: 'page-user-create'},
        {path: '/users/:userID', element: 'page-users-edit'}
    ];

    _stateChanged() {}

    _render(props: RouterProps) {
        const content = super._render(props);
        return html`
            ${CSS}
            ${content}
        `;
    }
}
