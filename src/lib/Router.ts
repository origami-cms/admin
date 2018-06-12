import {html, LitElement} from '@polymer/lit-element';
import {App} from 'actions';
import {unsafeHTML} from 'lit-html/lib/unsafe-html';
import {property} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import {installRouter} from 'pwa-helpers/router';
import store, {State} from 'store';
import {BASE_URI} from 'const';
import matchPath from 'lib/Path';

window.matchPath = matchPath;
export interface Routes {
    [path: string]: string | {
        element: string
        exact?: boolean;
    };
}

export interface RouterProps {
    path: string;
    routes: Routes;
    base: string;
}


export default class Router extends connect(store)(LitElement) implements RouterProps {
    @property
    path: string = '/';

    @property
    routes: Routes = {};

    @property
    base: string = BASE_URI;

    @property
    notfound?: string;

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

    _getRoutes(routes: Routes, base: string, path: string) {
        return Object.entries(routes)
            // Convert any routes to a route object
            .map(([route, ele]) => {
                let e = ele;
                if (typeof e === 'string') {
                    e = {element: e, exact: true};
                }
                return {
                    path: base + route,
                    route: e
                };
            })
            // Match each route against the current location
            .filter(r => {
                return matchPath(path, {
                    path: r.path,
                    exact: r.route.exact
                });
            })
            // Convert each valid route to a html template
            .map(r => this._renderElement(r.route.element));
    }

    _renderElement(ele: string) {
        const unsafe = `<${ele}></${ele}>`;
        return html`${unsafeHTML(unsafe)}`;
    }
}

