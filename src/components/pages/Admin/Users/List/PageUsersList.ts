import {html, LitElement} from '@polymer/lit-element';
import {RouterProps} from 'lib/Router';
import {component} from '@origamijs/zen-lib';


interface props {
}

@component('page-users-list')
export default class PageUsersList extends LitElement implements props {
    static columns = ['fname', 'lname', 'email'];

    render() {
        // @ts-ignore
        return html`<ui-resource-table resource="users" .columns=${this.constructor.columns}></ui-resource-table>`;
    }
}
