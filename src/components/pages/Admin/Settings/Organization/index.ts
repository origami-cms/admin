import {html, LitElement} from '@polymer/lit-element';
import {setTheme, setLogo} from 'actions/Organization';
import {component, property} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {OrganizationTheme} from 'store/state';

import CSS from './organization-css';

interface props {
    theme?: OrganizationTheme;
}

@component('page-settings-organization')
export class PageSettingsOrganization extends connect(store)(LitElement) implements props {
    @property
    theme?: OrganizationTheme;
    static _formGeneral = [
        {
            type: 'text',
            label: 'Organization name',
            placeholder: 'Organization name',
            name: 'name',
            icon: 'organization'
        },
        {
            type: 'text',
            label: 'Website',
            placeholder: 'Website',
            name: 'website',
            icon: 'web'
        }
    ];
    static _formTheme = [
        {
            type: 'color',
            label: 'Main color',
            name: 'colorMain',
            width: 'half'
        },
        {
            type: 'color',
            label: 'Secondary color',
            name: 'colorSecondary',
            width: 'half'
        },
        {
            type: 'submit',
            value: 'Save',
            icon: 'tick',
            color: 'green'
        }
    ];

    constructor() {
        super();
        this._saveTheme = this._saveTheme.bind(this);
        this._handleUpload = this._handleUpload.bind(this);
    }

    private _stateChanged(s: State) {
        this.theme = s.Organization.theme;
    }

    _render({theme}: props) {

        return html`
            ${CSS}
            <div class="general">
                <h4>General settings</h4>
                <div class="logo">
                    <zen-button color="blue" icon="upload">Update logo</zen-button>
                    <ui-file-uploader
                        placeholder="/admin/images/logo"
                        on-upload=${this._handleUpload}
                    ></ui-file-uploader>
                </div>
                <zen-form
                    fields=${this.constructor._formGeneral}
                ></zen-form>
            </div>

            <hr />

            <div class="theme">
                <h4>Theme</h4>
                <zen-form
                    values=${theme}
                    fields=${this.constructor._formTheme}
                    on-submit=${this._saveTheme}
                ></zen-form>
            </div>
        `;
    }

    private _saveTheme(e: Event) {
        const {colorMain, colorSecondary} = e.target.values;

        store.dispatch<any>(setTheme(colorMain, colorSecondary));
    }

    private async _handleUpload(e) {
        if (e.detail && e.detail.id) {
            const setting = await store.dispatch<any>(setLogo(e.detail.id));
        }
    }
}
