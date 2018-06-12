import API from 'lib/API';
import {Dispatch} from 'redux';
import State from 'store/state';

export const ME_SET = 'ME_SET';
export const ME_EMAIL_SET = 'ME_EMAIL_SET';

export const getMe = () =>
    async (dispatch: Dispatch<any>) => {
        const {data: me} = await API.get('/users/me');
        dispatch({type: ME_SET, me});
    };
