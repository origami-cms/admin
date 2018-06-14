import {html, LitElement} from '@polymer/lit-element';
import * as actions from 'actions';
import {upperFirst} from 'lodash';
import {Field, FormValues} from 'origami-zen';
import pluralize, {singular} from 'pluralize';
import {property} from 'polymer3-decorators';
// @ts-ignore
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import CSS from './resource-form-css';

interface props {
    type?: 'create' | 'edit';
    resource?: string;

    fields: Field[];
    values: FormValues;
    error: string | boolean;
    loading: boolean;
}

export default class FormResourceBase extends connect(store)(LitElement) implements props {
    @property
    type?: 'create' | 'edit';

    @property
    resource?: string;


    @property
    error: string | boolean = false;

    @property
    loading: boolean = false;

    @property
    fields: Field[] = [];

    @property
    values: FormValues = {};

    protected _store = store;
    protected _actions = actions;


    protected get _resPlural() {
        return pluralize(this.resource || '');
    }

    protected get _resPluralUpper() {
        return upperFirst(this._resPlural);
    }

    protected get _typeUpper() {
        return upperFirst(this.type);
    }


    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }


    _stateChanged(s: State) {
        const type = this.type === 'create' ? 'post' : 'edit';

        const res = s[this._resPluralUpper as keyof State];
        // @ts-ignore Is a resource
        if (!res._errors || !res._loading) throw new Error('Not a resource');
        // @ts-ignore Is a resource
        this.error = res._errors[type];
        // @ts-ignore Is a resource
        this.loading = Boolean(res._loading[type]);
    }


    submit(e: { target: { values: object } }) {
        let type = this._typeUpper;
        if (type === 'Edit') type = 'Update';

        switch (type) {
            case 'Update':
                store.dispatch<any>(
                    // @ts-ignore Is a valid resource
                    (actions[this._resPluralUpper])
                        // @ts-ignore
                        [`${this._resPlural}${type}`](this.id, e.target.values)
                );
                break;

            case 'Create':
                store.dispatch<any>(
                    // @ts-ignore Is a valid resource
                    (actions[this._resPluralUpper])
                        [`${this._resPlural}${type}`](e.target.values)
                );
                break;
        }
    }


    _render({error, values, fields, resource}: props) {
        const f = [...fields, {
            type: 'submit',
            name: '',
            icon: this.type === 'create' ? 'add' : 'tick',
            value: this.type === 'create' ? 'Create' : 'Save',
            color: 'green'
        }];

        return html`
            ${CSS}
            <div class="card shadow-main center-h">
                <h3 class="margin-t-small">${this._typeUpper} a ${this.resource}</h3>
                <zen-form
                    error=${error}
                    fields=${f}
                    values=${values}
                    on-change=${(e: {target: {values: object}}) => this.values = e.target.values}
                    on-submit=${this.submit}
                ></zen-form>
            </div>
        `;
    }
}
