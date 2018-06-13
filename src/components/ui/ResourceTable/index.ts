import {html, LitElement} from '@polymer/lit-element';
import {repeat} from 'lit-html/lib/repeat';
import * as actions from 'actions';
import {unsafeHTML} from 'lit-html/lib/unsafe-html';
import {upperFirst} from 'lodash';
import pluralize from 'pluralize';
import {component, property} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import CSS from './resource-table-css';


type data = {
    id: string;
    [key: string]: any
};

interface props {
    columns: string[];
    resource?: string;
    selected: string[];
    _resource?: string;
    _data: data[];
    _actions: {[action: string]: Function};
}

@component('ui-resource-table')
export default class ResourceTable extends connect(store)(LitElement) implements props {
    @property
    columns: string[] = [];

    @property
    selected: string[] = [];

    @property
    get resource() {
        return this._resource;
    }
    set resource(v) {
        this._resource = v;
        this._updateActions();
    }

    @property
    _data: data[] = [];


    _resource?: string;
    _actions: { [action: string]: Function } = {};


    private get _resPlural() {
        return pluralize(this.resource || '');
    }


    constructor() {
        super();
        this._handleCheckbox = this._handleCheckbox.bind(this);
    }


    private _stateChanged(s: State) {
        this._data = s[upperFirst(this._resPlural)][this._resPlural].asMutable();
    }


    private _firstRendered() {
        this._fetch();
    }


    _render({_data, columns, selected}: props) {
        const cols = this._getColumns(columns);

        return html`
            ${CSS}
            <style>:host{--cols: ${cols.length}}</style>
            <div class="row header">
                <div class="cell icon">
                    <zen-checkbox
                        size="medium"
                        on-change=${e => this._handleCheckbox(e, 'all')}
                    ></zen-checkbox>
                </div>
                ${unsafeHTML(cols.map(c => `
                    <div class="header">${c}</div>
                `).join(''))}
            </div>

            ${repeat(_data, (r: data) => r.id, (row: data) => html`
                <div class="row">
                    <div class="cell icon">
                        <zen-checkbox
                            size="medium"
                            on-change="${e => this._handleCheckbox(e, row)}"
                            checked=${selected.includes(row.id)}
                        ></zen-checkbox>
                    </div>
                    ${repeat(cols, c => c, c => html`
                        <div class="cell">${row[c]}</div>
                    `)}
                </div>
            `)}
        `;
    }


    private async _fetch() {
        store.dispatch<any>(this._actions.get());
    }


    private _updateActions() {
        const a = actions[upperFirst(this._resPlural)];
        this._actions = {
            create: a[`${this._resPlural}Create`],
            get: a[`${this._resPlural}Get`],
            remove: a[`${this._resPlural}Remove`],
            update: a[`${this._resPlural}Update`]
        };
    }


    private _getColumns(columns: string[]) {
        if (columns.length) return columns;
        const [firstRow] = this._data;
        if (!firstRow) return [];
        return Object.keys(firstRow);
    }

    private _handleCheckbox(e: Event, select: 'all' | data) {

        if (select === 'all') {
            this.selected = this.selected.length ? [] : this._data.map(o => o.id);
        } else if (typeof select === 'object') {
            const add = (e.target as HTMLInputElement).checked;
            if (add) this.selected.push(select.id);
            else this.selected = this.selected.filter(i => i !== select.id);
            this._requestRender();
        }
    }
}
