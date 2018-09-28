import {html, LitElement} from '@polymer/lit-element';
import {component} from '@origamijs/zen-lib';
import CSS from './page-not-found-css';

interface props {
}

@component('page-not-found')
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
