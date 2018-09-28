import Router, {Route} from 'lib/Router';
import lodash from 'lodash';
import {APIReducer} from '@origamijs/zen-lib/lib/API';
import {Field} from '@origamijs/zen-lib/lib/FormValidator/FormFieldTypes';
import {component, property} from '@origamijs/zen-lib';
import pluralize from 'pluralize';
import {injectReducer} from 'redux-injector';
import ResourceTable from '../ResourceTable';
import FormResourceCreate from '../../forms/Resource/Create/Create';
import FormResourceEdit from '../../forms/Resource/Edit/Edit';

interface Schema {
    properties: {
        [key: string]: any;
    };
}

interface props {
    resource?: string;
    fieldsList?: string[];
    fieldsCreate?: string[];
    fieldsEdit?: string[];
    model?: Schema;
    base: string;
    uribase?: string;
    listElement: string;
    editElement: string;
    createElement: string;
}

@component('ui-resource-page')
export default class PageResource extends Router implements props {
    @property
    resource?: string;

    @property
    fieldsList?: string[];

    @property
    fieldsCreate?: string[];

    @property
    fieldsEdit?: string[];

    @property
    model?: Schema;

    @property
    uribase?: string;

    @property
    listElement: string = 'ui-resource-table';

    @property
    editElement: string = 'form-resource-edit';

    @property
    createElement: string = 'form-resource-create';


    @property
    get routes(): Route[] {
        if (!this.resource) return [];
        const base = this.uribase || `/${this._resPlural}`;
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


    connectedCallback() {
        super.connectedCallback();
        injectReducer(`resources.${this._resPlural}`, APIReducer(this._resPlural));
    }


    _didRender() {
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
