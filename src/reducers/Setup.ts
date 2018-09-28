import {
    SETUP_USER_ERROR_SET,
    SETUP_LOADING_SET,
    SETUP_SET,
    SETUP_USER_SET
} from 'actions/Setup';

import {AnyAction} from 'redux';
import immutable, {ImmutableObject} from 'seamless-immutable';
import {Setup} from 'store/state';
export {ResourceState} from '@origamijs/zen-lib/lib/API';


const initialState = immutable.from<Setup>({
    setup: false,
    user: false,
    errors: {
        user: false
    },
    loading: {
        user: false
    }
});


export default (state: ImmutableObject<Setup> = initialState, action: AnyAction) => {
    switch (action.type) {
        case SETUP_USER_ERROR_SET:
            return state.setIn(['errors', 'user'], action.error);


        case SETUP_LOADING_SET:
            return state.setIn(['loading', 'user'], action.loading);


        case SETUP_SET:
            return state.set('setup', action.setup);


        case SETUP_USER_SET:
            return state.set('user', action.user);


        default:
            return state;
    }
};
