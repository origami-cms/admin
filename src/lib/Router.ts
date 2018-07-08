import {html, LitElement} from '@polymer/lit-element';
import {App} from 'actions';
import {BASE_URI} from 'const';
import matchPath from 'lib/Path';
import {unsafeHTML} from 'lit-html/lib/unsafe-html';
import {property} from 'polymer3-decorators';
// @ts-ignore
import {connect} from 'pwa-helpers/connect-mixin';
// @ts-ignore
import {installRouter} from 'pwa-helpers/router';
import store, {State} from 'store';
import {titleSet} from 'actions/App';
import {TemplateResult} from '../../node_modules/lit-html';

export interface Route {
    path: string;
    exact?: boolean;
    element: string;
    attributes?: {[prop: string]: string | number | boolean};
}

export interface RouterProps {
    path: string;
    routes: Route[];
    base: string;
    switch: boolean;
}


export default class Router extends connect(store)(LitElement) implements RouterProps {
    @property
    path: string = window.location.pathname;

    @property
    routes: Route[] = [];

    @property
    base: string = BASE_URI;

    @property
    notfound?: string;

    /** Only show one route */
    @property
    switch: boolean = true;

    protected _store = store;
    private _elementCache = new Map();
    private _routeCache = new Map();


    _stateChanged(state: State) {
        // tslint:disable-next-line
        if (this.path != state.App.page.path) this.path = state.App.page.path;
    }

    _firstRendered() {
        // Setup to watch the location and bind to redux store
        installRouter(
            (location: Location) => {
                store.dispatch<any>(titleSet(''));
                store.dispatch(
                    // @ts-ignore
                    App.navigate(window.decodeURIComponent(location.pathname))
                );
            }
        );
    }

    _render(props?: any): TemplateResult {
        return this._getRoutes();
    }

    _getRoutes() {
        // tslint:disable-next-line no-this-assignment
        const {routes, base, path, notfound} = this;
        let r = this._routeCache.get(path);

        if (!r) {
            r = routes
                // Match each route against the current location
                .filter(r => {
                    return matchPath(path, {
                        path: base + r.path,
                        exact: r.exact,
                        strict: false
                    });
                    // if (params) return {params: params.params, element: r.element};
                })
                // Convert each valid route to a html template
                .map(r => this._renderElement(r));


            if (!r.length && notfound) {
                r.push(
                    this._renderElement({element: notfound, path: ''})
                );
            }

            if (r.length) r = this.switch ? [r[0]] : r;
            const t = html`${r}`;
            this._routeCache.set(path, t);
            return t;

        } else return r;
    }


    _renderElement(r: Route) {
        // Lookup element in cache
        if (this._elementCache.get(r)) return this._elementCache.get(r);

        let attrs = '';
        if (r.attributes) {
            attrs = Object.entries(r.attributes)
                .map(([attr, val]) => `${attr}="${val}"`)
                .join(' ');
        }

        // TODO: Pass in props
        const unsafe = `<${r.element} ${attrs}></${r.element}>`;
        const route = html`${unsafeHTML(unsafe)}`;
        this._elementCache.set(r, route);
        return route;
    }
}

