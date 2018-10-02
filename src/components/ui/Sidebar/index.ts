import {html, LitElement, customElement, property} from '@polymer/lit-element';
import {getSidebarItems, toggleAppSelector} from 'actions/App';
import {BASE_URI} from 'const';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
// @ts-ignore
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {SidebarItem} from 'store/state';
import CSS from './sidebar-css';


export interface Routes {
    [path: string]: string;
}

interface props {
    apps: SidebarItem[];
    logo?: number;
}


// @ts-ignore
@customElement('ui-sidebar')
export default class Sidebar extends connect(store)(LitElement) implements props {
    @property()
    apps: SidebarItem[] = [];

    @property()
    logo?: number;

    _stateChanged(state: State) {
        const _apps = Object.entries(state.Apps.apps).map(([name, {manifest: a}]) => ({
            icon: a.icon.type,
            color: a.icon.color,
            path: `/${name}`,
            name: a.name
        }));
        this.apps = [..._apps, ...state.App.sidebar.items];

        if (state.Organization.logo) this.logo = state.Organization.logo;
    }

    connectedCallback() {
        super.connectedCallback();
        store.dispatch(getSidebarItems());
    }

    render() {
        const {apps, logo} = this;

        return html`
            ${CSS}

            <a href='${BASE_URI}/' class="top-link display-b">
                <img class="logo" src=${BASE_URI}/images/logo?${logo} alt="Logo"/>
            </a>

            <div class="search position-r">
                <zen-icon type="search" color="grey-300" size="main" class="center"></zen-icon>
            </div>

            <ul class="apps">
                ${apps.map(a => {
                    return unsafeHTML(`
                        <li class="position-r">
                            <a class="covers" href=${BASE_URI + a.path}>
                                <div class="app rounded gradient-${a.color}">
                                    <zen-icon type=${a.icon} color=${a.iconColor || 'white'} class="center" size="main"></zen-icon>
                                </div>
                            </a>
                        </li>
                    `);
                })}

            </ul>

            <div class="apps-button" @click=${() => store.dispatch(toggleAppSelector(true))}>
                <zen-icon type="grid" size="main" color="grey-300"></zen-icon>
            </div>
        `;
    }

    updated(p: any) {
        super.updated(p);
        (Array.from(this.shadowRoot.querySelectorAll('a')) as HTMLAnchorElement[]).forEach(a => {
            const href = a.getAttribute('href')!;
            const path = window.location.pathname;

            if (href === BASE_URI || href === `${BASE_URI}/`) {
                a.classList.toggle('active', path === BASE_URI || path === `${BASE_URI}/`);
            } else a.classList.toggle('active', path.startsWith(href));
        });
    }
}

