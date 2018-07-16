import Router, {Route} from 'lib/Router';
import {startCase} from 'lodash';
import {Field} from 'origami-zen';
import pluralize from 'pluralize';
import {component, property} from 'polymer3-decorators';
import {injectReducer} from 'redux-injector';
import {APIReducer} from 'origami-zen/API';

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
    get routes(): Route[] {
        if (!this.resource) return [];
        const base = this.uribase || `/${this._resPlural}`;
        return [
            {
                path: `${base}`,
                element: `ui-resource-table`,
                exact: true,
                attributes: {resource: this.resource, uribase: base}
            },
            {
                path: `${base}/create`,
                element: `form-resource-create`,
                attributes: {resource: this.resource}
            },
            {
                path: `${base}/:id`,
                element: `form-resource-edit`,
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
        const sr = this.shadowRoot;
        const list = sr.querySelector('ui-resource-table');
        const create = sr.querySelector('form-resource-create');
        const edit = sr.querySelector('form-resource-edit');

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
            field.placeholder = startCase(f);
            field.validate = {required: field.required};
            return field;
        });


        if (list) list.columns = fieldsList;
        if (create && fieldsCreate) create.fields = getFields(fieldsCreate);
        if (edit && fieldsEdit) edit.fields = getFields(fieldsEdit);
    }
}
