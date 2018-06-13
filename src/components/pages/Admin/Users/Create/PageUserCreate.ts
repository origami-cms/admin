import {html, LitElement} from '@polymer/lit-element';
import {RouterProps} from 'lib/Router';
import {component} from 'polymer3-decorators';


interface props {
}

@component('page-user-create')
export default class PageUsersList extends LitElement implements props {

    _render(props: RouterProps) {
        return html`<form-user-create></form-user-create>`;
    }
}
