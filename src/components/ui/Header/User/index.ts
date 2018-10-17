import { customElement, html, LitElement, property } from '@polymer/lit-element';
// @ts-ignore
import { connect } from 'pwa-helpers/connect-mixin';
import store, { State } from 'store';
import CSS from './header-user-css';

interface props {
    user: string | null;
}

// @ts-ignore
@customElement('ui-header-user')
export default class HeaderUser extends connect(store)(LitElement) implements props {
    @property()
    user: string | null = null;

    _stateChanged(s: State) {
        this.user = s.Me.id;
    }

    render() {
        return html`${CSS}<ui-avatar .user=${this.user}>`;
    }
}
