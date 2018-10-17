import {ZenRoute} from '@origamijs/zen';
import {APIReducer} from '@origamijs/zen-lib/lib/API';
import {Field} from '@origamijs/zen-lib/lib/FormValidator/FormFieldTypes';
import {customElement, LitElement, property, html} from '@polymer/lit-element';
import lodash from 'lodash';
import pluralize from 'pluralize';
import {injectReducer} from 'redux-injector';
import FormResourceCreate from '../../forms/Resource/Create/Create';
import FormResourceEdit from '../../forms/Resource/Edit/Edit';
import ResourceTable from '../ResourceTable';

interface Schema {
    properties: {
        [key: string]: any;
    };
}

// @ts-ignore
@customElement('ui-resource-page')
export default class PageResource extends LitElement {
    @property()
    resource?: string;

    @property()
    fieldsList?: string[];

    @property()
    fieldsCreate?: string[];

    @property()
    fieldsEdit?: string[];

    @property()
    model?: Schema;

    @property()
    uriBase?: string;

    @property()
    listElement: string = 'ui-resource-table';

    @property()
    editElement: string = 'form-resource-edit';

    @property()
    createElement: string = 'form-resource-create';


    @property()
    get routes(): ZenRoute[] {
        if (!this.resource) return [];
        const base = this.uriBase || `/${this._resPlural}`;
        return [
            {
                path: `${base}`,
                element: this.listElement,
                exact: true,
                attributes: {resource: this.resource, uribase: base}
            },
            {
                path: `${base}/create`,
                element: this.createElement,
                attributes: {resource: this.resource}
            },
            {
                path: `${base}/:id`,
                element: this.editElement,
                attributes: {resource: this.resource, uri: `/admin${base}/:id`}
            }
        ];
    }
    set routes(v) {}

    private get _resPlural() {
        return pluralize(this.resource || '');
    }


    render() {
        return html`
            <zen-router .routes=${this.routes} .base=${this.uriBase}></zen-router>
        `;
    }


    connectedCallback() {
        super.connectedCallback();
        injectReducer(`resources.${this._resPlural}`, APIReducer(this._resPlural));
    }


    updated() {
        const {fieldsList, fieldsCreate, fieldsEdit, model} = this;
        if (!model) return;

        const properties = model.properties;


        // @ts-ignore Shadow root exists
        const sr = this.shadowRoot as ShadowRoot;
        // @ts-ignore
        const list = sr.querySelector(this.listElement) as ResourceTable;
        // @ts-ignore
        const create = sr.querySelector(this.createElement) as FormResourceCreate;
        // @ts-ignore
        const edit = sr.querySelector(this.editElement) as FormResourceEdit;


        const getFields = (fields: string[]) => fields.map(f => {

            let field = properties[f] as Field;
            // @ts-ignore
            if (typeof field === 'string') field = {type: field};
            // @ts-ignore
            if (field.asMutable) field = field.asMutable({deep: true});

            // @ts-ignore
            if (field.type === 'uuid') {
                field.type = 'text';
                field.disabled = true;
            }

            field.name = f;
            // @ts-ignore
            if (!field.placeholder) field.placeholder = lodash.startCase(f);
            field.validate = {required: field.required};
            return field;
        });


        if (list && fieldsList) list.columns = fieldsList;
        if (create && fieldsCreate) create.fields = getFields(fieldsCreate);
        if (edit && fieldsEdit) edit.fields = getFields(fieldsEdit);
    }
}
