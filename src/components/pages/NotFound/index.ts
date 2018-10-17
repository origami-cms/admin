import {html, LitElement, customElement} from '@polymer/lit-element';

import CSS from './page-not-found-css';

interface props {
}

// @ts-ignore
@customElement('page-not-found')
export default class PageNotFound extends LitElement implements props {
    render() {
        return html`
            ${CSS}
            <h1>Page not found</h1>
            <a href='/admin/'>
                Return home
            </a>
        `;
    }
}
