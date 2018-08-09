import {html, LitElement} from '@polymer/lit-element';
import {Field} from 'origami-zen';
import {component} from 'origami-zen/util';


interface props {
}

@component('page-user-create')
export default class PageUsersList extends LitElement implements props {
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
            },
            {
                name: 'password',
                placeholder: 'Password',
                type: 'password',
                icon: 'lock',
                iconColor: 'grey-300'
            }
        ];
    }

    _render({}) {
        return html`<form-resource-create resource="user" fields=${this.fields}></form-resource-create>`;
    }
}
