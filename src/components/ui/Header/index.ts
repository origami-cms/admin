import {html, LitElement} from '@polymer/lit-element';
import {component, property} from '@origamijs/zen-lib';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import CSS from './header-css';
import {ButtonOptions} from '@origamijs/zen';

export * from './Notifications';
export * from './User';

interface props {
    heading?: string;
    actions: ButtonOptions[];
}


@component('ui-header')
export default class Header extends connect(store)(LitElement) implements props {
    @property
    heading?: string;

    @property
    actions: ButtonOptions[] = [];

    _stateChanged(state: State) {
        this.heading = state.App.page.title;
        this.actions = state.App.page.actions;
    }

    render() {
        return html`
            ${CSS}
            <h1 class="display-ib">${this.heading}</h1>
            ${this.actions.length
                ? html`<zen-button-group buttons=${this.actions}></zen-button-group>`
                : null
            }
            <ui-header-notifications></ui-header-notifications>
            <ui-header-user></ui-header-user>
        `;
    }
}

