import {html, LitElement} from '@polymer/lit-element';
import {component} from 'polymer3-decorators';
import CSS from './page-not-found-css';

interface props {
}

@component('page-not-found')
export default class PageNotFound extends LitElement implements props {
    _render({}: props) {
        return html`
            ${CSS}
            <h1>Page not found</h1>
            <zen-link href='/admin'>
                Return home
            </zen-link>
        `;
    }
}
