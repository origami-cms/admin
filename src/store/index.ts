import {createStore, applyMiddleware, Store} from 'redux';
import thunkMiddleware from 'redux-thunk';

import MainReducer from '../reducers';

// @ts-ignore
export default createStore(
    MainReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

export {default as State} from './state';
