import {SERVER_API} from '../const';
import {API} from 'origami-zen/lib/API';

const api = new API(SERVER_API, 'Authorization');

export default api;

