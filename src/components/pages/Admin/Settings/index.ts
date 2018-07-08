import {html} from '@polymer/lit-element';
import {titleSet} from 'lib/decorators';
import Router, {Route, RouterProps} from 'lib/Router';
import {component} from 'polymer3-decorators';
import {Me} from 'store/state';
import CSS from './page-settings-css';

interface props {
    me?: Me;
}

export * from './Organization';
export * from './SettingsMenu';

@component('page-settings')
@titleSet('Settings')
export default class PageAdmin extends Router implements props {
    me?: Me;
    base = '/admin/settings';

    routes: Route[] = [
        {
            path: '/organization',
            element: 'page-settings-organization'
        },
        {
            path: '/me',
            element: 'page-settings-me'
        }
    ];

    _render(props: RouterProps) {
        const page = super._render();

        return html`
            ${CSS}
            <page-settings-menu></page-settings-menu>
            <section>
                ${page}
            </section>
        `;
    }
}
