import { ButtonOptions } from '@origamijs/zen';
import { customElement, html, LitElement, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import store, { State } from 'store';
import CSS from './header-css';

export * from './Notifications';
export * from './User';

interface props {
    heading?: string;
    actions: ButtonOptions[];
}


// @ts-ignore
@customElement('ui-header')
export default class Header extends connect(store)(LitElement) implements props {
    @property()
    heading?: string;

    @property()
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
                ? html`<zen-button-group .buttons=${this.actions}></zen-button-group>`
                : null
            }
            <ui-header-notifications></ui-header-notifications>
            <ui-header-user></ui-header-user>
        `;
    }
}

