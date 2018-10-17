import { customElement, html, LitElement, property } from '@polymer/lit-element';
import CSS from './avatar-css';

interface props {
    user?: string;
}

// @ts-ignore
@customElement('ui-avatar')
export default class UserAvatar extends LitElement implements props{
    @property()
    user?: string;

    render() {
        return html`
            ${CSS}
            <img .src=${`/content/profiles/${this.user}`} alt="User avatar"/>
        `;
    }
}
