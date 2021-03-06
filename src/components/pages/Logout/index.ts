import {html, LitElement, customElement} from '@polymer/lit-element';
import {navigate} from 'actions/App';
import {logout} from 'actions/Auth';

import store from 'store';


// @ts-ignore
@customElement('page-logout')
export default class PageLogout extends LitElement {
    async connectedCallback() {
        super.connectedCallback();
        await store.dispatch(logout());
        await store.dispatch(navigate('/admin/login'));
    }

    render() {
        const cssCenter = 'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)';
        return html`<zen-loading .style=${cssCenter} size="large"></zen-loading>`;
    }
}
