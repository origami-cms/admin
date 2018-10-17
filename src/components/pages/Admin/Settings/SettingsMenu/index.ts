import {html, LitElement, customElement} from '@polymer/lit-element';

import CSS from './page-settings-menu-css';

interface Link {
    icon?: string;
    text?: string;
    to?: string;
}

interface props {
}

// @ts-ignore
@customElement('page-settings-menu')
export default class SettingsMenu extends LitElement implements props {
    private _links: Link[] = [
        {
            icon: 'organization',
            text: 'Organization',
            to: '/admin/settings/organization'
        },
        {
            icon: 'user',
            text: 'My settings',
            to: '/admin/settings/me'
        }
    ];

    render() {
        // @ts-ignore
        return html`
            ${CSS}
            <ul>
                ${this._links.map(l => html`
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
