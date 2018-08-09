import FormResourceBase from '../Base/ResourceFormBase';
import {component} from 'origami-zen/util';

@component('form-resource-create')
export default class FormResourceEdit extends FormResourceBase {
    constructor() {
        super();
        this.type = 'create';
    }
}
