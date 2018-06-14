import {html, LitElement} from '@polymer/lit-element';
import {App} from 'actions';
import {BASE_URI} from 'const';
import matchPath from 'lib/Path';
import {unsafeHTML} from 'lit-html/lib/unsafe-html';
import {property} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import {installRouter} from 'pwa-helpers/router';
import store, {State} from 'store';

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


    _stateChanged(state: State) {
        this.path = state.App.page.path;
    }

    _firstRendered() {
        // Setup to watch the location and bind to redux store
        installRouter(
            (location: Location) => {
                store.dispatch(
                    // @ts-ignore
                    App.navigate(window.decodeURIComponent(location.pathname))
                );
                this._requestRender();
            }
        );
    }

    _render({path, routes, base}: RouterProps) {
        const pages = this._getRoutes(this.routes, base, path);

        if (!pages.length && this.notfound) {
            pages.push(
                this._renderElement({element: this.notfound, path: ''})
            );
        }


        return html`${pages}`;
    }

    _getRoutes(routes: Route[], base: string, path: string) {
        const r = [...routes]
            // Match each route against the current location
            .filter(r => {
                return matchPath(path, {
                    path: this.base + r.path,
                    exact: r.exact,
                    strict: false
                });
                // if (params) return {params: params.params, element: r.element};
            })
            // Convert each valid route to a html template
            .map(r => this._renderElement(r));

        if (!r.length) return [];
        return this.switch ? [r[0]] : r;
    }

    _renderElement(r: Route) {
        let attrs = '';
        if (r.attributes) {
            attrs = Object.entries(r.attributes)
                .map(([attr, val]) => `${attr}="${val}"`)
                .join(' ');
        }

        // TODO: Pass in props
        const unsafe = `<${r.element} ${attrs}></${r.element}>`;
        return html`${unsafeHTML(unsafe)}`;
    }
}

