import {LitElement} from '@polymer/lit-element';
import {upload} from 'actions/Media';
import {html} from 'lit-html/lib/lit-extended';
import {InputFile} from 'origami-zen';
import {component, property} from 'polymer3-decorators';
import store from 'store';

import CSS from './file-uploader-css';

interface props {
    placeholder?: string;
}

@component('ui-file-uploader')
export default class FileUploader extends LitElement implements props {
    @property
    placeholder?: string;

    constructor() {
        super();
        this._handleChange = this._handleChange.bind(this);
    }

    _render({placeholder}: props) {
        return html`
            ${CSS}
            <zen-input-file
                on-change=${this._handleChange}
                placeholder=${placeholder}
            ></zen-input-file>
        `;
    }

    private async _handleChange(e: {target: InputFile}) {
        const files = e.target.files;

        if (files[0]) {
            const {data} = await store.dispatch(upload(files[0]));
            this.dispatchEvent(new CustomEvent('upload', {
                detail: data
            }));
        }
    }
}
