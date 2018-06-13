import {Dispatch} from 'redux';
import API from 'lib/API';

export const appGet = (name: string) =>
    async (dispatch: Dispatch) => {
        const {data} = await API.get(`/app/${name}`);
    };
