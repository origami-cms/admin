import {html, LitElement} from '@polymer/lit-element';
import {App} from 'actions';
import {unsafeHTML} from 'lit-html/lib/unsafe-html';
import {property} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import {installRouter} from 'pwa-helpers/router';
import store, {State} from 'store';
import {BASE_URI} from 'const';
import matchPath from 'lib/Path';

export interface Route {
    path: string;
    exact?: boolean;
    element: string;
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
        const pages = this._getRoutes(routes, base, path);

        if (!pages.length && this.notfound) {
            pages.push(
                this._renderElement(this.notfound)
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
                    exact: r.exact
                });
            })
            // Convert each valid route to a html template
            .map(r => this._renderElement(r.element));

        if (!r.length) return [];
        return this.switch ? [r[0]] : r;
    }

    _renderElement(ele: string) {
        const unsafe = `<${ele}></${ele}>`;
        return html`${unsafeHTML(unsafe)}`;
    }
}

