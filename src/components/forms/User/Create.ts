import {html, LitElement} from '@polymer/lit-element';
import {login} from 'actions/Auth';
import {navigate} from 'actions/App';
import {Field, FormValues} from 'origami-zen';
import {component, property} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import CSS from './create-css';
import {usersCreate} from 'actions/Users';

interface props {
    error: string | boolean;
    loading: boolean;
    values: FormValues;
}

@component('form-user-create')
export default class FormUserCreate extends connect(store)(LitElement) implements props {
    @property
    error: string | boolean = false;

    @property
    loading: boolean = false;

    @property
    values: FormValues = {};

    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }

    _stateChanged(s: State) {
        this.error = s.Users._errors.post;
        this.loading = Boolean(s.Users._loading.post);
    }


    static fields: Field[] = [
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
        },
        {
            type: 'submit',
            name: '',
            icon: 'add',
            value: 'Create',
            color: 'green'
        }
    ];


    submit(e: {target: {values: object} }) {
        store.dispatch<any>(usersCreate(e.target.values));
    }

    _render({error, values}: props) {
        return html`
            ${CSS}
            <div class="card shadow-main center-h">
                <img class="width-super margin-b-main margin-r-main display-ib float-left" src="/admin/images/icons/user/create.svg" />
                <h3 class="margin-t-small">Add ${values.fname || 'user'} to Origami</h3>
                <div class="clear">
                <zen-form
                    error=${error}
                    fields=${this.constructor.fields}
                    on-change=${e => this.values = e.target.values}
                    on-submit=${this.submit}
                ></zen-form>
            </div>
        `;
    }
}
