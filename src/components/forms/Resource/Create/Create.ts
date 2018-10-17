import {customElement} from '@polymer/lit-element';
import FormResourceBase from '../Base/ResourceFormBase';


// @ts-ignore
@customElement('form-resource-create')
export default class FormResourceCreate extends FormResourceBase {
    constructor() {
        super();
        this.type = 'create';
    }
}
