import {html} from '@polymer/lit-element';
import {titleSet} from 'lib/decorators';
import Router, {Route, RouterProps} from 'lib/Router';
import {TemplateResult} from 'lit-html';
import {component} from '@origamijs/zen-lib';
import {Me} from 'store/state';
import CSS from './page-settings-css';

interface props extends RouterProps {
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

    render(props: props) {
        const page = super.render();

        return html`
            ${CSS}
            <page-settings-menu></page-settings-menu>
            <section>
                ${page}
            </section>
        `;
    }
}
