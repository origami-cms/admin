import {html} from '@polymer/lit-element';
import {getMe} from 'actions/Me';
import Router, {RouterProps} from 'lib/Router';
import {component} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {Me} from 'store/state';
import CSS from './page-admin-css';

interface props {
    me?: Me;
}

@component('page-admin')
export default class PageAdmin extends connect(store)(Router) implements props {
    me?: Me;

    routes = {
        '/': 'page-dashboard',
        '/users': 'page-users'
    };

    notfound = 'page-not-found';

    _stateChanged(s: State) {
        this.me = s.Me;
    }
    _firstRendered() {
        store.dispatch<any>(getMe());
    }

    _render(props: RouterProps) {
        const page = super._render(props);
        return html`
            ${CSS}
            <ui-sidebar></ui-sidebar>
            <ui-header></ui-header>
            <main>${page}</main>
        `;
    }
}
