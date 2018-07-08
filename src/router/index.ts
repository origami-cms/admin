// tslint:disable variable-name
import Router, {RouterProps} from 'lib/Router';
import {html} from '@polymer/lit-element';
import {component, property} from 'polymer3-decorators';
import {navigate} from 'actions/App';
import {verify} from 'actions/Auth';
import {State} from 'store';
import {BASE_URI} from 'const';
import {getTheme} from 'actions/Organization';

interface props {
    _verified: boolean;
    _verifyError: string | null;
    __verifyError: string | null;
    _loading: boolean;
}

// Simple router for all main pages, and verifies token on page refresh.
// Boots to login if invalid verification or no JWT
@component('zen-app')
export default class AppRouter extends Router implements props {
    notfound = 'page-not-found';

    _verified: boolean = false;
    __verifyError: string | null = null;

    @property
    _loading: boolean = true;

    routes = [
        {path: '/login', element: 'page-login'},
        {path: '/logout', element: 'page-logout'},
        {path: '/', element: 'page-admin'}
    ];

    // @ts-ignore Is correct props
    _render(props: props) {
        // @ts-ignore Is correct props
        const page = super._render(props as RouterProps);
        const cssCenter = 'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)';
        if (props._loading && !props._verified) return html`<zen-loading style=${cssCenter} size="large"></zen-loading>`;
        else return page;
    }

    _stateChanged(s: State) {
        super._stateChanged(s);
        this._verifyError = s.Auth.errors.verify;
        this._verified = Boolean(s.Auth.verified);
        // TODO: Convert to a better structure
        // Works around the flashing of showing the dashboard if not logged in
        setTimeout(() => {
            this._loading = s.Auth.loading.verifying;
        }, 10);
    }

    _firstRendered() {
        super._firstRendered();
        this._store.dispatch<any>(verify());
        this._store.dispatch<any>(getTheme());
    }

    get _verifyError() {
        return this.__verifyError;
    }

    set _verifyError(v) {
        if (this.__verifyError === v) return;

        this.__verifyError = v;
        const url = `${BASE_URI}/login`;

        if (v && this.path !== url) this._store.dispatch<any>(navigate(url));
    }
}
