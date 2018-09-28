import {html, LitElement} from '@polymer/lit-element';
import {RouterProps} from 'lib/Router';
import {component} from '@origamijs/zen-lib';
import CSS from './page-settings-menu-css';

interface Link {
    icon?: string;
    text?: string;
    to?: string;
}

interface props {
}

interface propsWithRouter extends props, RouterProps { }


@component('page-settings-menu')
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
                        <zen-link href=${l.to}>
                            ${l.icon ? html`<zen-icon type=${l.icon} color='grey-300' size="medium"></zen-icon>` : ''}
                            <span>${l.text}</span>
                        </zen-link>
                    </li>
                `)}
            </ul>
        `;
    }
}
