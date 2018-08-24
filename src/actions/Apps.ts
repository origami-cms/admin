import {Dispatch} from 'redux';
import API from 'lib/API';
import {Origami} from 'origami-core-lib';
import AppGenerator from 'lib/AppGenerator/index';

export const APPS_SET = 'APPS_SET';
export const APP_SET = 'APP_SET';
export const APPS_PAGE_SET = 'APPS_PAGE_SET';
export const APPS_SCRIPT_SET = 'APPS_SCRIPT_SET';


export const appsGet = () =>
    async (dispatch: Dispatch) => {
        const {data} = await API.get(`/apps/`);
        if (data) dispatch({type: APPS_SET, apps: data});
        return data;
    };

export const appGet = (appName: string) =>
    async (dispatch: Dispatch) => {
        const {data} = await API.get(`/apps/${appName}`);
        if (data) {
            // @ts-ignore
            dispatch({type: APP_SET, app: data, appName});

            return data;
        }
    };


export const appGetPage = (appName: string, page: Origami.AppManifestPage) =>
    async (dispatch: Dispatch) => {
        // @ts-ignore is a string from 'text'
        const content = await API.get(
            `/apps/${appName}/pages/${page.page}`, true, 'text'
        ) as string;

        const scriptPromises: Promise<any>[] = [];

        if (page.scripts) {
            page.scripts.forEach(s => {
                scriptPromises.push(API.get(`/apps/${appName}/scripts/${s}`, true, 'text'));
            });
        }

        const scripts = (await Promise.all(scriptPromises)).filter(s => s);


        const tagName = AppGenerator.generate(appName, page.page, content, scripts);
        dispatch({type: APPS_PAGE_SET, appName, path: page.path, tagName});
    };
