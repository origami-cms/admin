import FormResourceBase from '../Base/ResourceFormBase';
import {component} from '@origamijs/zen-lib';

@component('form-resource-create')
export default class FormResourceCreate extends FormResourceBase {
    constructor() {
        super();
        this.type = 'create';
    }
}
