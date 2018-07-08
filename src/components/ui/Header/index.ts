import {html, LitElement} from '@polymer/lit-element';
import {component, property} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import CSS from './header-css';

export * from './Notifications';
export * from './User';


export interface Routes {
    [path: string]: string;
}

interface props {
    heading?: string;
}


@component('ui-header')
export default class Header extends connect(store)(LitElement) implements props {
    @property
    heading?: string;

    _stateChanged(state: State) {
        this.heading = state.App.page.title;
    }

    _render({heading}: props) {
        return html`
            ${CSS}
            <h1 class="display-ib">${heading}</h1>
            <ui-header-notifications></ui-header-notifications>
            <ui-header-user></ui-header-user>
        `;
    }
}

