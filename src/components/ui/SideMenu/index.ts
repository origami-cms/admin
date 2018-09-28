import {html, LitElement} from '@polymer/lit-element';
import {component, property} from '@origamijs/zen-lib';
import CSS from './side-menu-css';
import {BASE_URI} from 'const';


export interface Link {
    icon?: string;
    text?: string;
    to?: string;
}

export interface SettingsMenuProps {
    links: Link[];
}


@component('ui-side-menu')
export default class SideMenu extends LitElement {
    @property
    links: Link[] = [];

    render() {
        let {links} = this;
        // Prefix all links with BASE_URI
        if (links) {
                links = links.map(l => ({
                ...l,
                ...{to: !l.to!.startsWith(BASE_URI) ? BASE_URI + l.to : l.to}
            }));
        }
        return html`
            ${CSS}
            <ul>
                ${links.map(l => html`
                    <li>
                        <a href=${l.to}>
                            ${l.icon ? html`<zen-icon .type=${l.icon} color='grey-300' size="medium"></zen-icon>` : ''}
                            <span>${l.text}</span>
                        </a>
                    </li>
                `)}
            </ul>
        `;
    }
}
