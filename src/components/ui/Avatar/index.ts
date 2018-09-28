import {LitElement, html} from '@polymer/lit-element';
import CSS from './avatar-css';
import {component, property} from '@origamijs/zen-lib';

interface props {
    user?: string;
}

@component('ui-avatar')
export default class UserAvatar extends LitElement implements props{
    @property
    user?: string;

    render() {
        return html`
            ${CSS}
            <img src=${`/content/profiles/${this.user}`} />
        `;
    }
}
