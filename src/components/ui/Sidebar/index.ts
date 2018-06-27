import {html, LitElement} from '@polymer/lit-element';
import {getSidebarItems} from 'actions/App';
import {BASE_URI} from 'const';
import {component, property} from 'polymer3-decorators';
// @ts-ignore
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {SidebarItem} from 'store/state';
import {unsafeHTML} from 'lit-html/lib/unsafe-html';
import CSS from './sidebar-css';


export interface Routes {
    [path: string]: string;
}

interface props {
    apps: SidebarItem[];
}


@component('ui-sidebar')
export default class Sidebar extends connect(store)(LitElement) implements props {
    @property
    apps: SidebarItem[] = [];

    _stateChanged(state: State) {
        this.apps = state.App.sidebar.items;
    }

    _firstRendered() {
        store.dispatch<any>(getSidebarItems());
    }

    _render({apps}: props) {
        const l = window.location.pathname;

        return html`
            ${CSS}

            <zen-link href='${BASE_URI}/' class="top-link display-b">
                <img class="logo" src="${BASE_URI}/images/logo" />
            </zen-link>

            <div class="search position-r">
                <zen-icon type="search" color="main" size="main" class="center"></zen-icon>
            </div>

            <div class="apps-button">
                <zen-icon type="grid" size="main"></zen-icon>
            </div>

            <ul class="apps">
                ${apps.map(a => {
                    return unsafeHTML(`
                        <li class="position-r">
                            <zen-link class="cover" href=${BASE_URI + a.path}>
                                <div class="app rounded gradient-${a.color}">
                                    <zen-icon type=${a.icon} color="white" class="center" size="main"></zen-icon>
                                </div>
                            </zen-link>
                        </li>
                    `);
                })}

            </ul>
        `;
    }
}

