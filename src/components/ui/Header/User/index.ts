import {component, property} from '@origamijs/zen-lib';
import {LitElement, html} from '@polymer/lit-element';
import CSS from './header-user-css';
// @ts-ignore
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';

interface props {
    user: string | null;
}

@component('ui-header-user')
export default class HeaderUser extends connect(store)(LitElement) implements props {
    @property
    user: string | null = null;

    _stateChanged(s: State) {
        this.user = s.Me.id;
    }

    _render({user}: props) {
        return html`${CSS}<ui-avatar user=${user}>`;
    }
}
