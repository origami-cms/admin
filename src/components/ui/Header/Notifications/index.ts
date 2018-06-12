import {component} from 'polymer3-decorators';
import {LitElement, html} from '@polymer/lit-element';
import CSS from './notifications-css';

@component('ui-header-notifications')
export default class Notifications extends LitElement {
    _render() {
        return html`${CSS}<zen-icon type="bell" color="main" class="center"></zen-icon>`;
    }
}
