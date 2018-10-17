import {ButtonOptions} from '@origamijs/zen';
import {APIActions} from '@origamijs/zen-lib/lib/API';
import {customElement, html, LitElement, property} from '@polymer/lit-element';
import {navigate} from 'actions/App';
import API from 'lib/API';
import pluralize from 'pluralize';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import CSS from './resource-table-css';


type ResourceTableData = {
    id: string;
    [key: string]: any
};

// @ts-ignore
@customElement('ui-resource-table')
export default class ResourceTable extends connect(store)(LitElement) {

    @property()
    uriBase?: string;

    @property()
    // Update actions
    resource?: string;

    @property()
    idKey = 'id';

    @property()
    selected: number[] = [];

    @property()
    _data: ResourceTableData[] = [];

    @property()
    _buttons: ButtonOptions[] = [];

    @property()
    _actions: { [action: string]: Function } = {};


    private get _resPlural() {
        return pluralize(this.resource || '');
    }


    constructor() {
        super();
        this._actionCreate = this._actionCreate.bind(this);
        this._actionEdit = this._actionEdit.bind(this);
        this._actionRemove = this._actionRemove.bind(this);
        this._handleRowClick = this._handleRowClick.bind(this);
    }


    private _stateChanged(s: State) {
        // @ts-ignore
        this._data = s.resources[this._resPlural][this._resPlural].asMutable();
    }


    private firstUpdated() {
        this._updateActions();
        this._get();
    }


    render() {
        return html`
            ${CSS}
            <zen-button-group .buttons=${this._buttons}></zen-button-group>
            <zen-table
                .data=${this._data}
                hoverable
                selectable
                @rowclick=${this._handleRowClick}
                @select=${this._handleSelect.bind(this)}
            >
                <slot></slot>
            </zen-table>
        `;
    }


    updated(p: any) {
        if (p.has('resource')) this._updateActions();
        if (p.has('selected')) this._updateButtons();
    }


    private async _get() {
        store.dispatch(this._actions.get());
    }


    private async _actionCreate() {
        const base = `/admin${this.uriBase || `/${this._resPlural}`}`;
        store.dispatch(navigate(`${base}/create`));
    }


    private async _actionEdit(id: string) {
        if (!id) throw new Error('No ID specified');

        const base = `/admin${this.uriBase || `/${this._resPlural}`}`;
        store.dispatch(navigate(`${base}/${id}`));
    }


    private async _actionRemove() {
        store.dispatch(
            this._actions.remove(
                this.selected.map(i => this._data[i][this.idKey])
            )
        );
        // @ts-ignore
        this.shadowRoot!.querySelector('zen-table').selected = [];
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
                    onclick: () => this._actionEdit(this._data[s[0]].id)
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


    private _handleSelect(e: CustomEvent) {
        this.selected = e.detail;
        this._updateButtons();
    }


    private _handleRowClick(e: CustomEvent) {
        // Disable opening a row if any rows are selected
        if (this.selected.length) return;

        this._actionEdit(e.detail[this.idKey]);
    }
}
