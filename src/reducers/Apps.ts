import {APPS_SET, APP_SET, APPS_PAGE_SET, APPS_SCRIPT_SET} from 'actions/Apps';
import deepmerge from 'deepmerge';
import {AnyAction} from 'redux';
import immutable from 'seamless-immutable';
import {Apps} from 'store/state';


const initialState = immutable<Apps>({
    apps: {}
});


export default (state = initialState, action: AnyAction) => {
    const existingApp = state.apps[action.appName] || {};

    switch (action.type) {
        case APPS_SET:
            // Wrap the apps in a {manifest} object
            const apps = (Object.entries(action.apps).map(
                ([name, manifest]) => ([
                    name, {manifest, pages: {}},
                ])
            ) as [string, any][])
            // Convert back to object
            .reduce(
                (_apps, [name, manifest]) => {
                    _apps[name] = manifest;
                    return _apps;
                }, {} as {[name: string]: any});

            return state.set('apps', deepmerge(
                state.set,
                apps
            ));


        case APP_SET:
            const manifest = existingApp.manifest || {};
            return state.setIn(['apps', action.appName, 'manifest'], deepmerge(
                manifest,
                action.app
            ));


        case APPS_PAGE_SET:
            if (existingApp) {
                return state.setIn(['apps', action.appName, 'pages', action.path], action.tagName);
            }

        default:
            return state;

    }
};
