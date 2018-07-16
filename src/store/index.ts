import {applyMiddleware} from 'redux';
import {createInjectStore} from 'redux-injector';
import thunkMiddleware from 'redux-thunk';
import MainReducer from '../reducers';

export default createInjectStore(
    MainReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

export {default as State} from './state';
