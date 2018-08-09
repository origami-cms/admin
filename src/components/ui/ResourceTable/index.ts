import {html, LitElement} from '@polymer/lit-element';
import {navigate} from 'actions/App';
import API from 'lib/API';
import {repeat} from 'lit-html/lib/repeat';
import {unsafeHTML} from 'lit-html/lib/unsafe-html';
import {APIActions} from 'origami-zen/API';
import {ButtonOptions} from 'origami-zen/packages/components/ButtonGroup/ButtonGroup';
import pluralize from 'pluralize';
import {component, property} from 'origami-zen/util';
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
    uribase?: string;
    _resource?: string;
    _selected: string[];
    _data: data[];
    _actions: {[action: string]: Function};
    _buttons: ButtonOptions[];
}

@component('ui-resource-table')
export default class ResourceTable extends connect(store)(LitElement) implements props {
    @property
    columns: string[] = [];

    @property
    uribase?: string;

    @property
    get resource() {
        return this._resource;
    }
    set resource(v) {
        this._resource = v;
        this._updateActions();
    }

    get selected() {
        return this._selected;
    }
    set selected(v) {
        this._selected = v;
        this._updateButtons();
    }

    @property
    _data: data[] = [];

    @property
    _buttons: ButtonOptions[] = [];


    _resource?: string;
    @property
    _selected: string[] = [];
    _actions: { [action: string]: Function } = {};


    private get _resPlural() {
        return pluralize(this.resource || '');
    }


    constructor() {
        super();
        this._actionCreate = this._actionCreate.bind(this);
        this._actionEdit = this._actionEdit.bind(this);
        this._actionRemove = this._actionRemove.bind(this);
        this._handleCheckbox = this._handleCheckbox.bind(this);
        this._handleRowClick = this._handleRowClick.bind(this);
    }


    private _stateChanged(s: State) {
        // @ts-ignore
        this._data = s.resources[this._resPlural][this._resPlural].asMutable();
    }


    private _firstRendered() {
        this._get();
    }


    _render({_data, columns, _selected = [], _buttons}: props) {

        const cols = this._getColumns(columns);

        return html`
            ${CSS}
            <style>:host{--cols: ${cols.length}}</style>
            <zen-button-group buttons=${_buttons}></zen-button-group>
            <div class="table">
                <div class="row header">
                    <div class="cell icon">
                        <zen-checkbox
                            size="medium"
                            on-change=${(e: Event) => this._handleCheckbox(e, 'all')}
                        ></zen-checkbox>
                    </div>
                    ${unsafeHTML(cols.map(c => `
                        <div class="header">${c}</div>
                    `).join(''))}
                </div>

                ${repeat(_data, (r: data) => r.id, (row: data) => html`
                    <div class="row" on-click=${(e: Event) => this._handleRowClick(e, row)}>
                        <div class="cell icon">
                            <zen-checkbox
                                size="medium"
                                on-change="${(e: Event) => this._handleCheckbox(e, row)}"
                                checked=${_selected.includes(row.id)}
                            ></zen-checkbox>
                        </div>
                        ${repeat(cols, c => c, c => html`
                            <div class="cell">${row[c]}</div>
                        `)}
                    </div>
                `)}
            </div>
        `;
    }

    _didRender() {
        super._didRender();
        // @ts-ignore Shadow root exists
        const rows = this.shadowRoot.querySelectorAll('.table .row:not(.header)');
        (Array.from(rows) as HTMLElement[]).forEach((r, i) => {
            const id = this._data[i].id;
            r.classList.toggle('active', this.selected.includes(id));
        });
    }


    private async _get() {
        store.dispatch(this._actions.get());
    }

    private async _actionCreate() {
        const base = `/admin${this.uribase || `/${this._resPlural}`}`;
        store.dispatch(navigate(`${base}/create`));
    }

    private async _actionEdit(id: string) {
        if (!id) throw new Error('No ID specified');

        const base = `/admin${this.uribase || `/${this._resPlural}`}`;
        store.dispatch(navigate(`${base}/${id}`));
    }

    private async _actionRemove() {
        store.dispatch(this._actions.remove(this.selected));
        this.selected.forEach(this._unselect);
    }

    private _updateActions() {
        const a = APIActions(this._resPlural, API);

        this._actions = {
            create: a[`${this._resPlural}Create`],
            get: a[`${this._resPlural}Get`],
            remove: a[`${this._resPlural}Remove`],
            update: a[`${this._resPlural}Update`]
        };
    }

    private _updateButtons() {

        const buttons = [];

        const s = this.selected;
        if (s.length >= 1) {
            buttons.push({
                icon: 'remove', text: 'Remove', color: 'red', size: 'medium',
                onclick: this._actionRemove
            });

            if (s.length === 1) {
                buttons.push({
                    icon: 'edit', text: 'Edit', color: 'blue', size: 'medium',
                    onclick: () => this._actionEdit(s[0])
                });
            }
        } else {
            buttons.push({
                icon: 'add', text: 'Create', color: 'green', size: 'medium',
                onclick: this._actionCreate
            });
        }


        this._buttons = buttons;
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
            if (add) {
                const s = [...this.selected];
                s.push(select.id);
                this.selected = s;
            } else this._unselect(select.id);
            // @ts-ignore Is just protected
            this._requestRender();
        }
    }

    private _handleRowClick(e: Event, row: data) {
        const t = e.target as HTMLElement;

        // Disable opening a row if any rows are selected
        if (this.selected.length) return;

        // If not clicked on one of these elements
        const exclude = ['zen-checkbox'];
        if (!exclude.includes(t.tagName.toLowerCase())) this._actionEdit(row.id);
    }

    private _unselect(id: string) {
        this.selected = this.selected.filter(i => i !== id);
    }
}
