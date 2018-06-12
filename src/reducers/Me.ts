import {Me as actions} from 'actions';
const {ME_EMAIL_SET, ME_SET} = actions;

import {LS_EMAIL} from 'const';
import {AnyAction} from 'redux';
import immutable, {ImmutableObject} from 'seamless-immutable';
import {Me} from 'store/state';


const initialState = immutable({
    id: null,
    fname: null,
    lname: null,
    email: localStorage.getItem(LS_EMAIL)
});


export default (state: ImmutableObject<Me> = initialState, action: AnyAction) => {
    switch (action.type) {
        case ME_SET:
            return state.merge(action.me);


        case ME_EMAIL_SET:
            localStorage.setItem(LS_EMAIL, action.email);

            return state.set('email', action.email);


        default:
            return state;
    }
};
