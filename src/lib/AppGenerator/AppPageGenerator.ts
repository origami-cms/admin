import {LitElement} from '@polymer/lit-element';
import {html} from 'lit-html/lib/lit-extended';
import {unsafeHTML} from 'lit-html/lib/unsafe-html';

export default (tagName: string, content: string, scripts: string[] = []) => {
    class GeneratedAppPage extends LitElement {
        static page = tagName;

        _firstRendered() {
            scripts.forEach(s => {
                // tslint:disable-next-line no-function-constructor-with-string-args
                const f = new Function(s);
                f.call(this);
            });
        }

        _render() {
            return html`
                ${unsafeHTML(content)}
            `;
        }
    }
    window.customElements.define(tagName, GeneratedAppPage);

    return tagName;
};
