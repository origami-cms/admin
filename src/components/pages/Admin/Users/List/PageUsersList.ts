import {html, LitElement} from '@polymer/lit-element';
import {RouterProps} from 'lib/Router';
import {component} from 'polymer3-decorators';


interface props {
}

@component('page-users-list')
export default class PageUsersList extends LitElement implements props {
    static columns = ['fname', 'lname', 'email'];

    _render(props: RouterProps) {
        return html`<ui-resource-table resource="users" columns=${this.constructor.columns}></ui-resource-table>`;
    }
}
