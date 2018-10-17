import {APIReducer} from '@origamijs/zen-lib/lib/API';
import App from './App';
import Apps from './Apps';
import Auth from './Auth';
import Me from './Me';
import Organization from './Organization';
import Setup from './Setup';
export {AnyAction} from 'redux';


export default {
    Auth,
    App,
    Apps,
    Me,
    Setup,
    Organization,
    resources: {
        users: APIReducer('users'),
    }
};
