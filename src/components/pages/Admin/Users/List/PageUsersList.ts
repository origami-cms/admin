import {html, LitElement} from '@polymer/lit-element';
import {component} from '@origamijs/zen-lib';


@component('page-users-list')
export default class PageUsersList extends LitElement {
    static columns = ['fname', 'lname', 'email'];

    render() {
        // @ts-ignore
        return html`<ui-resource-table resource="users" .columns=${this.constructor.columns}></ui-resource-table>`;
    }
}
