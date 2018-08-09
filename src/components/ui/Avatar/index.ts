import {LitElement, html} from '@polymer/lit-element';
import CSS from './avatar-css';
import {component, property} from 'origami-zen/util';

interface props {
    user?: string;
}

@component('ui-avatar')
export default class UserAvatar extends LitElement implements props{
    @property
    user?: string;

    _render({user}: props) {
        return html`
            ${CSS}
            <img src=${`/content/profiles/${user}`} />
        `;
    }
}
