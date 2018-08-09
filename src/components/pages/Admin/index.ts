import {html} from '@polymer/lit-element';
import {getMe} from 'actions/Me';
import {appsGet} from 'actions/Apps';
import Router, {Route, RouterProps} from 'lib/Router';
import {component, property} from 'origami-zen/util';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {Me, AppDetail} from 'store/state';
import CSS from './page-admin-css';

interface props {
    me?: Me;
    _appSelectorOpen: boolean;
}

interface propsWithRouter extends props, RouterProps { }

export * from './App';
export * from './Settings';
export * from './Users';

@component('page-admin')
export default class PageAdmin extends connect(store)(Router) implements props {
    name = 'admin';
    me?: Me;

    @property
    _appSelectorOpen: boolean = false;

    baseRoutes: Route[] = [
        {path: '/404', element: 'page-not-found', exact: true},
        {path: '/', element: 'page-dashboard', exact: true},
        {path: '/users', element: 'page-users'},
        {path: '/settings', element: 'page-settings'}
    ];

    apps: { [name: string]: AppDetail } = {};

    notfound = 'page-not-found';

    get routes() {
        return [
            ...Object.keys(this.apps).map(name => ({
                path: `/${name}`,
                element: 'page-app',
                attributes: {appName: name}
            })),
            ...this.baseRoutes
        ];
    }
    set routes(v) { }


    _stateChanged(s: State) {
        this.me = s.Me;
        this._appSelectorOpen = s.App.appSelector.open;
        this.apps = s.Apps.apps;
    }


    async _firstRendered() {
        store.dispatch(getMe());
        await store.dispatch(appsGet());

        // @ts-ignore Added from Router
        this._getRoutes();
        // @ts-ignore Added from Router
        this._requestRender();
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

