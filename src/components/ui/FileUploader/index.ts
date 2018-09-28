import {LitElement, html} from '@polymer/lit-element';
import {upload} from 'actions/Media';
import {InputFile} from '@origamijs/zen';
import {component, property} from '@origamijs/zen-lib';
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

    render() {
        return html`
            ${CSS}
            <zen-input-file
                on-change=${this._handleChange}
                .placeholder=${this.placeholder}
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
