import {APIActions} from 'origami-zen/API';
import API from 'lib/API';

export const TEMPLATES_SET = 'TEMPLATES_SET';
export const TEMPLATES_LOADING_SINGLE_START = 'TEMPLATES_LOADING_SINGLE_START';
export const TEMPLATES_LOADING_SINGLE_END = 'TEMPLATES_LOADING_SINGLE_END';
export const TEMPLATES_LOADING_ALL_START = 'TEMPLATES_LOADING_ALL_START';
export const TEMPLATES_LOADING_ALL_END = 'TEMPLATES_LOADING_ALL_END';

export const {
    templatesGet
} = APIActions('templates', API);
