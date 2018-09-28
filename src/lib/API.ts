import {SERVER_API} from '../const';
import {API} from '@origamijs/zen-lib/lib/API';

const api = new API(SERVER_API, 'Authorization');

export default api;

