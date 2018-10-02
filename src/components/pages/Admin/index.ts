import {ZenRoute} from '@origamijs/zen';
import {customElement, html, LitElement, property} from '@polymer/lit-element';
import {appsGet} from 'actions/Apps';
import {getMe} from 'actions/Me';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {AppDetail, Me} from 'store/state';
import CSS from './page-admin-css';

interface PageAdminProps {
    me?: Me;
    _appSelectorOpen: boolean;
}

export * from './App';
export * from './Settings';
export * from './Users';

// @ts-ignore
@customElement('page-admin')
export default class PageAdmin extends connect(store)(LitElement) implements PageAdminProps {
    base = '/admin';
    me?: Me;

    @property()
    _appSelectorOpen: boolean = false;

    baseRoutes: ZenRoute[] = [
        {path: '/404/', element: 'page-not-found', exact: true},
        {path: '/users/(.*)', element: 'page-users'},
        {path: '/settings/(.*)', element: 'page-settings'},
        {path: '/', element: 'page-dashboard', exact: true}
    ];

    @property()
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
        if (Object.keys(s.Apps.apps).length !== Object.keys(this.apps).length) {
            this.apps = s.Apps.apps;
        }
    }


    async firstUpdated() {
        store.dispatch(getMe());
        await store.dispatch(appsGet());
    }

    render() {
        // @ts-ignore
        return html`
            ${CSS}
            <ui-sidebar></ui-sidebar>
            <ui-header></ui-header>
            <zen-router .routes=${this.routes} .base=${this.base} notfound="page-not-found"></zen-router>
            <ui-app-selector .open=${this._appSelectorOpen}> </ui-app-selector>
        `;
    }

    updated(p: any) {
        super.updated(p);
        this.shadowRoot.querySelector('zen-router').routes = this.routes;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'page-admin': PageAdmin;
    }
}
