
import {html, LitElement, customElement} from '@polymer/lit-element';
import {titleSet} from 'lib/decorators';
import {Router, ZenRoute} from '@origamijs/zen';
import {Me} from 'store/state';
import CSS from './page-settings-css';
import {TemplateResult} from 'lit-html';

interface PageSettingsProps {
    me?: Me;
}

export * from './Organization';
export * from './SettingsMenu';

// @ts-ignore
@customElement('page-settings')
@titleSet('Settings')
export default class PageSettings extends LitElement implements PageSettingsProps {
    me?: Me;
    base = '/admin/settings';

    routes: ZenRoute[] = [
        {
            path: '/organization',
            element: 'page-settings-organization'
        },
        {
            path: '/me',
            element: 'page-settings-me'
        }
    ];

    render(): TemplateResult {
        return html`
            ${CSS}
            <page-settings-menu></page-settings-menu>
            <zen-router base=${this.base} .routes=${this.routes}></zen-router>
        `;
    }
}
