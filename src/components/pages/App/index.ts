import {html, LitElement} from '@polymer/lit-element';
import {login} from 'actions/Auth';
import {navigate} from 'actions/App';
import {Field, FormValues} from 'origami-zen';
import {component, property} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';

interface props {
    error: string | null;
    loggedIn?: boolean;
    values?: FormValues;
}

@component('page-app')
export default class PageLogin extends connect(store)(LitElement) implements props {
    @property
    error: string | null = null;

    @property
    loggedIn?: boolean;

    @property
    values?: FormValues = {
        email: 'hello@tristanmatthias.com',
        password: 'pass'
    };

    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }

    _stateChanged(s: State) {
        this.error = s.Auth.errors.loggingIn;
        this.loggedIn = s.Auth.loggedIn;
    }

    static fields: Field[] = [
        {
            type: 'email',
            name: 'email',
            placeholder: 'Email',
            icon: 'mail'
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            icon: 'lock'
        },
        {
            type: 'submit',
            value: 'Login',
            icon: 'arrow-right',
            name: ''
        }
    ];

    submit(e: { target: { values: { email: string, password: string } } }) {
        const {email, password} = e.target.values;
        store.dispatch<any>(login(email, password));
    }

    _render({error, values}: props) {
        // @ts-ignore
        const {fields} = this.constructor;

        return html`
            ${CSS}
            <div class="center rounded text-center padding-large shadow-shade-1">
                <img class="logo margin-b-large height-main" src="/images/logo-origami.svg"/>
                <zen-form
                    fields=${fields}
                    on-submit=${this.submit}
                    error=${error}
                    values=${values}
                />
            </div>
        `;
    }

    _propertiesChanged(p: props, c: props, o: props) {
        super._propertiesChanged(p, c, o);
        if (c.loggedIn) {
            store.dispatch<any>(navigate('/admin'));
        }
    }
}
