import {html, LitElement} from '@polymer/lit-element';
import {App} from 'actions';
import {unsafeHTML} from 'lit-html/lib/unsafe-html';
import {property} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import {installRouter} from 'pwa-helpers/router';
import store, {State} from 'store';
import {BASE_URI} from 'const';


export interface Routes {
    [path: string]: string;
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

    protected _store = store;


    _stateChanged(state: State) {
        this.path = state.App.page.path;
    }

    _firstRendered() {
        // Setup to watch the location and bind to redux store
        installRouter(
            (location: Location) => store.dispatch(
                // @ts-ignore
                App.navigate(window.decodeURIComponent(location.pathname))
            )
        );
    }

    _render({path, routes, base}: RouterProps) {
        const routesWithBase = Object.entries(routes).map(([route, ele]) => ({
            route: base + route,
            ele
        })).reduce((obj, cur) => {
            obj[cur.route] = cur.ele;
            return obj;
        }, {} as Routes);


        const ele = routesWithBase[path];
        if (!ele) return html``;


        const unsafe = `<${ele}></${ele}>`;

        return html`${unsafeHTML(unsafe)}`;
    }
}

