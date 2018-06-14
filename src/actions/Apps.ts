import {Dispatch} from 'redux';
import API from 'lib/API';

export const APPS_SET = 'APPS_SET';

export const appGet = (name: string) =>
    async (dispatch: Dispatch) => {
        const {data} = await API.get(`/apps/${name}`);
        if (data) {
            dispatch({type: APPS_SET, apps: [data.manifest]});
        }
    };
