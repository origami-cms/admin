import {html, LitElement} from '@polymer/lit-element';
import {navigate} from 'actions/App';
import API from 'lib/API';
import matchPath from 'lib/Path';
import {Field} from 'origami-zen';
import {APIActions} from 'origami-zen/API';
import {component, property} from 'origami-zen/util';
// @ts-ignore
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {User} from 'store/state';
import CSS from './edit-css';


interface props {
    id?: string;
    errorGet: string | boolean;
    errorEdit: string | boolean;
    loadingGet: boolean;
    loadingEdit: boolean;
    user?: User;
    _id?: string;
}


@component('form-user-edit')
export default class FormUserCreate extends connect(store)(LitElement) implements props {
    @property
    get id() {
        return this._id;
    }
    set id(v) {
        if (this._id === v || !v) return;
        this._id = v;
        this._get();
    }
    _id ?: string;

    @property
    errorGet: string | boolean = false;

    @property
    errorEdit: string | boolean = false;

    @property
    loadingGet: boolean = false;

    @property
    loadingEdit: boolean = false;

    @property
    user?: User;


    private _redirecting: boolean = false;
    private _actions = APIActions('users', API);

    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }


    _stateChanged(s: State) {
        if (this.errorGet && !this._redirecting) {
            this._redirecting = true;
            if (window.location.pathname !== '/admin/404') store.dispatch(navigate('/admin/404'));
            return;
        }

        this.errorGet = s.resources.users._errors.get;
        this.errorEdit = s.resources.users._errors.edit;
        this.loadingEdit = Boolean(s.resources.users._loading.edit);
        this.loadingGet = Boolean(s.resources.users._loading.single);

        const match = matchPath(s.App.page.path, '/admin/users/:userID');
        if (match) {
            // tslint:disable
            if (this.id != match.params.userID) this.id = match.params.userID;
            const u = s.resources.users.users.find((u: any) => u.id === this.id);
            if (u) this.user = u;
        }
    }


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
                type: 'submit',
                name: '',
                icon: 'tick',
                value: 'Save',
                color: 'green'
            }
        ];
    }


    submit(e: {target: {values: object} }) {
        store.dispatch(this._actions.usersUpdate(this.id, e.target.values));
    }

    _get() {
        if (!this.id) return;
        if (!this.loadingGet) store.dispatch(this._actions.usersGet(this.id));
    }


    _render({errorEdit, user}: props) {
        if (!user) return html``;

        return html`
            ${CSS}
            <div class="card shadow-main center-h">
                <h3>
                    <ui-avatar user=${this.id || 'default'} size="main" class="align-middle"></ui-avatar>
                    <span class="align-middle margin-l-tiny">Edit <strong>${user.fname}</strong></span>
                </h3>
                <zen-form
                    error=${errorEdit}
                    fields=${this.fields}
                    values=${user}
                    on-change=${(e: {target: {values: User}}) => this.user = e.target.values}
                    on-submit=${this.submit}
                ></zen-form>
            </div>
        `;
    }
}
