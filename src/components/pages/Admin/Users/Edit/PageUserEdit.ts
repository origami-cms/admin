import {html, LitElement} from '@polymer/lit-element';
import {Field} from 'origami-zen';
import {component} from 'polymer3-decorators';


interface props {
}

@component('page-user-edit')
export default class PageUsersEdit extends LitElement implements props {
    get fields(): Field[] {
        return [
            {
                name: 'fname',
                placeholder: 'First name',
                type: 'text',
                width: 'half',
                icon: 'user',
                iconColor: 'grey-300'
            },
            {
                name: 'lname',
                placeholder: 'Last name',
                type: 'text',
                width: 'half',
                icon: 'user',
                iconColor: 'grey-300'
            },
            {
                name: 'email',
                placeholder: 'Email',
                type: 'email',
                icon: 'mail',
                iconColor: 'grey-300'
            }
        ];
    }

    _render({ }) {
        return html`<form-resource-edit resource="user" fields=${this.fields}></form-resource-edit>`;
    }
}
