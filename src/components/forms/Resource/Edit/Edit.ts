import { customElement, property } from '@polymer/lit-element';
import { navigate } from 'actions/App';
import matchPath from 'lib/Path';
import store, { State } from 'store';
import FormResourceBase from '../Base/ResourceFormBase';

// @ts-ignore
@customElement('form-resource-edit')
export default class FormResourceEdit extends FormResourceBase {
    @property()
    get id() {
        return this._id;
    }
    set id(v) {
        if (this._id === v || !v) return;
        this._id = v;
        this._get();
    }
    _id?: string;

    @property()
    uri?: string;

    _redirecting: boolean = false;
    _errorGet: string | boolean = false;
    _errorEdit: string | boolean = false;
    _loadingGet: string | boolean = false;
    _loadingEdit: string | boolean = false;

    constructor() {
        super();
        this.type = 'edit';
    }

    _stateChanged(s: State) {
        super._stateChanged(s);
        // @ts-ignore
        const res = s.resources[this._resPlural];

        if (this._errorGet && !this._redirecting) {
            this._redirecting = true;
            if (window.location.pathname !== '/admin/404') store.dispatch(navigate('/admin/404'));
            return;
        }

        this._errorGet = res._errors.get;
        this._errorEdit = res._errors.edit;
        this._loadingEdit = Boolean(res._loading.edit);
        this._loadingGet = Boolean(res._loading.single);

        const match = matchPath(s.App.page.path, this.uri || `/admin/${this._resPlural}/:id`);

        if (match) {
            // tslint:disable
            if (this.id != match.params.id) this.id = match.params.id;
            const u = res[this._resPlural].find((r: any) => r.id === this.id);

            if (u) this.values = u;
        }
    }

    _get() {
        if (!this.id) return;
        if (!this._loadingGet) {
            // @ts-ignore Is a valid resource
            store.dispatch(this._actions[`${this._resPlural}Get`](this.id))
        }
    }
}
