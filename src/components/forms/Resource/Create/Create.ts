import FormResourceBase from '../Base/ResourceFormBase';
import {component} from 'polymer3-decorators';

@component('form-resource-create')
export default class FormResourceEdit extends FormResourceBase {
    constructor() {
        super();
        this.type = 'create';
    }
}
