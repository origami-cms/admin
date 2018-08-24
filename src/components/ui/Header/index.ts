import {html, LitElement} from '@polymer/lit-element';
import {component, property} from 'origami-zen/util';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import CSS from './header-css';
import {ButtonOptions} from 'origami-zen/components/ButtonGroup/ButtonGroup';

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

    _render({heading, actions}: props) {
        return html`
            ${CSS}
            <h1 class="display-ib">${heading}</h1>
            ${actions.length
                ? html`<zen-button-group buttons=${actions}></zen-button-group>`
                : null
            }
            <ui-header-notifications></ui-header-notifications>
            <ui-header-user></ui-header-user>
        `;
    }
}

