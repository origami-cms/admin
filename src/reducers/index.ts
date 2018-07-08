import {combineReducers, AnyAction} from 'redux';
export {AnyAction} from 'redux';


import {APIReducer} from '../../../zen/API';


import Auth from './Auth';
import App from './App';
import Apps from './Apps';
import Me from './Me';
import Setup from './Setup';
import Organization from './Organization';
// import Pages from './Pages';

export default combineReducers({
    Auth,
    App,
    Apps,
    Me,
    Setup,
    Organization,
    // Pages,
    Users: APIReducer('users'),
    Brokers: APIReducer('brokers'),
    Templates: APIReducer('templates', undefined, 'name')
});
