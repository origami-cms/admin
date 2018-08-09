import {html, LitElement} from '@polymer/lit-element';
import {getSidebarItems, toggleAppSelector} from 'actions/App';
import {BASE_URI} from 'const';
import fuse from 'fuse.js';
import {unsafeHTML} from 'lit-html/lib/unsafe-html';
import {component, property} from 'origami-zen/util';
// @ts-ignore
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {SidebarItem} from 'store/state';
import {bindAttributes} from 'origami-zen/util/decorators';
import CSS from './app-selector-css';


export interface Routes {
    [path: string]: string;
}

interface props {
    apps: SidebarItem[];
    _filtered: SidebarItem[];
}


@component('ui-app-selector')
@bindAttributes
export default class Sidebar extends connect(store)(LitElement) implements props {
    @property
    open: boolean = false;

    @property
    apps: SidebarItem[] = [];

    static _boundAttributes = ['open'];

    private _fuse?: fuse;
    private _filter?: string;

    @property
    _filtered: SidebarItem[] = [];


    @property
    get filter() {
        return this._filter;
    }
    set filter(v) {
        this._filter = v;
        if (!this._fuse || !v) this._filtered = [];
        else this._filtered = this._fuse.search(v);
    }

    constructor() {
        super();
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this.close = this.close.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keydown', this._handleKeyDown);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keydown', this._handleKeyDown);
    }


    _stateChanged(state: State) {
        this.apps = state.App.sidebar.items;
        this.open = state.App.appSelector.open;
        this._fuse = new fuse(this.apps, {
            keys: ['name']
        });
    }


    _firstRendered() {
        store.dispatch(getSidebarItems());
    }


    _render({_filtered, apps}: props) {
        let contents;

        if (this.filter && !_filtered.length) {
            contents = html`<span class="not-found">No apps found for '${this.filter}'. Try searching for something else.</span>`;

        } else {
            const _apps = _filtered.length ? _filtered : apps;
            const aniDelay = 0.13;
            const totalAniTime = 0.2;

            contents = html`
                <ul class="apps" on-click=${this.close}>
                    ${_apps.map((a, i) => {
                        return unsafeHTML(`
                            <li style="animation-delay: ${(i / _apps.length) * totalAniTime + aniDelay}s">
                                <zen-link href=${BASE_URI + a.path}>
                                    <div class="app rounded gradient-${a.color}">
                                        <zen-icon type=${a.icon} color="${a.iconColor || 'white'}" class="center" size="main"></zen-icon>
                                    </div>
                                    <small>${a.name}</small>
                                </zen-link>
                            </li>
                        `);
                    })}
                </ul>
            `;
        }


        // TODO: Add click event listener to the list item and not the list
        return html`
            ${CSS}
            <zen-icon type="cross" on-click=${this.close} color="grey-200" size="large"></zen-icon>
            <h1>Applications</h1>

            <div class="wrapper">
                <zen-input icon="search"
                    placeholder="Search for an app…"
                    on-change="${(e: {target: {value: string}}) => this.filter = e.target.value}"
                ></zen-input>

                ${contents}
            </div>
        `;
    }

    private _didRender() {
        // @ts-ignore Shadow root exists
        if (this.open) this.shadowRoot.querySelector('zen-input').focus();
    }


    private _handleKeyDown(e: KeyboardEvent) {
        switch (e.key) {
            case 'Escape':
                this.close();
                break;
        }
    }

    close() {
        if (this.open) store.dispatch(toggleAppSelector(false));
    }
}

