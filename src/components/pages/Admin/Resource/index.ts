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
        const sr = this.shadowRoot;
        const list = sr.querySelector('ui-resource-table');
        const create = sr.querySelector('form-resource-create');
        const edit = sr.querySelector('form-resource-edit');

        const getFields = (fields: string[]) => fields.map(f => {

            let field = properties[f] as Field;
            // @ts-ignore
            if (typeof field === 'string') field = {type: field};
            // @ts-ignore
            else field = field.asMutable({deep: true});

            // @ts-ignore
            if (field.type === 'uuid') {
                field.type = 'text';
                field.disabled = true;
            }

            field.name = f;
            // @ts-ignore
            field.placeholder = startCase(f);
            field.validate = {required: field.required};
            return field;
        });


        if (list) list.columns = listFields;
        if (create && createFields) create.fields = getFields(createFields);
        if (edit && editFields) edit.fields = getFields(editFields);
    }
}
