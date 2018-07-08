import {html} from '@polymer/lit-element';
import {getMe} from 'actions/Me';
import Router, {Route, RouterProps} from 'lib/Router';
import {component, property} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {Me} from 'store/state';
import CSS from './page-admin-css';

interface props {
    me?: Me;
    _appSelectorOpen: boolean;
}

interface propsWithRouter  extends props, RouterProps {}

export * from './Resource';
export * from './Settings';
export * from './Users';

@component('page-admin')
export default class PageAdmin extends connect(store)(Router) implements props {
    me?: Me;

    @property
    _appSelectorOpen: boolean = false;

    routes: Route[] = [
        {path: '/404', element: 'page-not-found', exact: true},
        {path: '/', element: 'page-dashboard', exact: true},
        {path: '/users', element: 'page-users'},
        {path: '/settings', element: 'page-settings'},

        {path: '/brokers', element: 'page-resource', attributes: {resource: 'broker'}}
    ];

    notfound = 'page-not-found';

    _stateChanged(s: State) {
        this.me = s.Me;
        this._appSelectorOpen = s.App.appSelector.open;
    }
    _firstRendered() {
        store.dispatch<any>(getMe());
    }

    _render(props: propsWithRouter) {
        const page = super._render(props);

        // @ts-ignore
        return html`
            ${CSS}
            <ui-sidebar></ui-sidebar>
            <ui-header></ui-header>
            <main>${page}</main>
            <ui-app-selector open=${props._appSelectorOpen}> </ui-app-selector>
        `;
    }
}

