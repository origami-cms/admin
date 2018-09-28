import {html} from '@polymer/lit-element';
import Router, {RouterProps} from 'lib/Router';
import {component} from '@origamijs/zen-lib';
import {connect} from 'pwa-helpers/connect-mixin';
import store from 'store';
import CSS from './page-users-css';

export * from './Create/PageUserCreate';
export * from './Edit/PageUserEdit';
export * from './List/PageUsersList';


interface props {
}

@component('page-users')
export default class PageUsers extends connect(store)(Router) implements props {
    routes = [
        {path: '/users', element: 'page-users-list', exact: true},
        {path: '/users/create', element: 'page-user-create'},
        {path: '/users/:userID', element: 'page-user-edit'}
    ];

    _stateChanged() {}

    render(props: RouterProps) {
        const content = super.render(props);
        return html`
            ${CSS}
            ${content}
        `;
    }
}
