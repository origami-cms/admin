import {html} from '@polymer/lit-element';
import {appGet} from 'actions/Apps';
import Router from 'lib/Router';
import {upperFirst, startCase} from 'lodash';
import {Field} from 'origami-zen';
import pluralize from 'pluralize';
import {component, property} from 'polymer3-decorators';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {AppDetail} from 'store/state';
import CSS from './page-resource-css';


interface props {
    app?: AppDetail;
    resource?: string;
}

@component('page-resource')
export default class PageResource extends connect(store)(Router) implements props {
    @property
    resource?: string;

    @property
    app?: AppDetail;

    @property
    get routes() {
        return [
            {
                path: `/${this._resPlural}`,
                element: `ui-resource-table`,
                exact: true,
                attributes: {resource: this.resource}
            },
            {
                path: `/${this._resPlural}/create`,
                element: `form-resource-create`,
                attributes: {resource: this.resource}
            },
            {
                path: `/${this._resPlural}/:id`,
                element: `form-resource-edit`,
                attributes: {resource: this.resource}
            }
        ];
    }
    set routes(v) {}

    private get _resPlural() {
        return pluralize(this.resource || '');
    }

    private get _resPluralUpper() {
        return upperFirst(this._resPlural);
    }

    _stateChanged(s: State) {
        if (!this.app) this.app = s.Apps.apps.find(a => a.name === this._resPluralUpper);
    }


    _firstRendered() {
        if (this.resource) store.dispatch<any>(appGet(this._resPlural));
    }


    _render(props: props) {
        const content = super._render(props);

        return html`
            ${CSS}
            ${content}
        `;
    }

    _didRender() {
        if (!this.app) return;
        const [page] = this.app.pages;

        const {listFields, createFields, editFields} = page.properties;

        const model = this.app.resources.find(r => r.name === this.resource);
        if (!model) return;
        const properties = model.properties;


        // @ts-ignore Shadow root exists
        const list = this.shadowRoot.querySelector('ui-resource-table');
        const create = this.shadowRoot.querySelector('form-resource-create');
        const edit = this.shadowRoot.querySelector('form-resource-edit');

        const getFields = fields => fields.map(f => {
            const field = properties[f].asMutable({deep: true}) as Field;

            field.name = f;
            field.placeholder = startCase(f);
            field.validate = {required: field.required};
            return field;
        });


        if (list) list.columns = listFields;
        if (create) create.fields = getFields(createFields);
        if (edit) edit.fields = getFields(editFields);
    }
}
