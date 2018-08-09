import {html, LitElement} from '@polymer/lit-element';
import {BASE_URI} from 'const';
import matchPath from 'lib/Path';
import {unsafeHTML} from 'lit-html/lib/unsafe-html';
import {property} from 'origami-zen/util';
// @ts-ignore
import {installRouter} from 'pwa-helpers/router';
import {TemplateResult} from 'lit-html';
import deepequal from 'deep-equal';

export interface JSONElement {
    element: string;
    attributes?: { [prop: string]: string | number | boolean };
    children?: JSONElement[];
}

export interface Route extends JSONElement {
    path: string;
    exact?: boolean;
}

export interface RouterProps {
    path: string;
    routes: Route[];
    base: string;
    switch: boolean;
    _path: string;
}


export default class Router extends LitElement implements RouterProps {
    @property
    routes: Route[] = [];

    @property
    base: string = BASE_URI;

    @property
    notfound?: string;

    /** Only show one route */
    @property
    switch: boolean = true;

    @property
    _path: string = '';
    private _pathsCache = new Map();
    private _routesCache = new Map();
    private _elementsCache = new Map();
    private _activeRoutes: Route[] = [];


    @property
    get path() { return this._path; }
    set path(v) {
        if (v !== this._path) this._update(v);
    }

    connectedCallback() {
        super.connectedCallback();
        this._timeoutPath();
        // Setup the watcher for location changes
        installRouter(this._timeoutPath.bind(this));
    }


    _render(props?: any): TemplateResult {
        const cache = this._elementsCache.get(this._activeRoutes);
        if (cache && cache.length) return cache[0];

        return  html``;
    }


    private _getRoutes(path: string = this.path) {
        // Attempt to find routes in the cache by path lookup
        if (this._pathsCache.has(path)) {
            return this._pathsCache.get(path);
        }

        // Filter the routes to what's active, and save in the cache
        const routes = this.routes.filter(r => {
            return matchPath(path, {
                path: this.base + r.path,
                exact: r.exact,
                strict: false
            });
        });

        if (routes.length) {
            this._pathsCache.set(path, routes);
            this._elementsCache.set(
                routes,
                routes.map(
                    this._createElement.bind(this)
                )
            );
        }

        return routes;
    }


    private _createElement(r: Route) {
        const getHTML = (r: JSONElement) => {
            let attrs = '';
            if (r.attributes) {
                attrs = Object.entries(r.attributes)
                    .map(([attr, val]) => `${attr}= '${val}'`)
                    .join(' ');
            }

            let children = '';
            if (r.children) children = r.children.map(getHTML).join('');

            // TODO: Pass in props
            return ` <${r.element} ${attrs}> </${r.element}>`;
        };

        // Lookup element in cache
        if (this._elementsCache.get(r)) return this._elementsCache.get(r);

        const route = html`${unsafeHTML(getHTML(r))}`;
        this._elementsCache.set(r, route);
        return route;
    }


    private _timeoutPath() {
        setTimeout(() => {
            this.path = window.location.pathname;
        }, 10);
    }


    private _update(path: string = this.path) {
        const newRoutes = this._getRoutes(path);
        if (!deepequal(this._activeRoutes, newRoutes) || !this._activeRoutes.length) {
            this._activeRoutes = newRoutes;
            this._path = path;
            this._requestRender();
        }
    }
}
