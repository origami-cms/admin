import {Dispatch} from 'redux';
import {ButtonOptions} from 'origami-zen/components/ButtonGroup/ButtonGroup';


export const APP_SIDEBAR_ITEMS_SET = 'APP_JEWEL_ITEMS_SET';
export const APP_PATH_UPDATE = 'APP_PATH_UPDATE';
export const APP_TABS_NEW = 'APP_TABS_NEW';
export const APP_TABS_CLOSE = 'APP_TABS_CLOSE';
export const APP_TABS_NAME = 'APP_TABS_NAME';
export const APP_TITLE_SET = 'APP_TITLE_SET';
export const APP_ACTIONS_SET = 'APP_ACTIONS_SET';
export const APP_SELECTOR_SET = 'APP_SELECTOR_SET';


export const getSidebarItems = () =>
    (dispatch: Dispatch) => {
        // TODO: Convert to endpoint
        dispatch({type: APP_SIDEBAR_ITEMS_SET, items: [
            // {
            //     icon: 'page',
            //     color: 'red',
            //     path: '/pages',
            //     name: 'Pages'
            // },
            // {
            //     icon: 'dollar',
            //     color: 'green',
            //     path: '/app/sales',
            //     name: 'Sales'
            // },
            // {
            //     icon: 'messages',
            //     color: 'orange',
            //     path: '/app/engagement',
            //     name: 'Engagement'
            // },
            {
                icon: 'user',
                color: 'blue',
                path: '/users',
                name: 'Users'
            },
            // {
            //     icon: 'image',
            //     color: 'gold',
            //     path: '/images',
            //     name: 'Images'
            // },
            {
                icon: 'settings',
                color: 'white',
                path: '/settings',
                name: 'Settings',
                iconColor: 'grey-700'
            }
        ]});
    };


export const titleSet = (title: string) =>
    (dispatch: Dispatch) => dispatch({type: APP_TITLE_SET, title});

export const pageActionsSet = (actions: ButtonOptions) =>
    (dispatch: Dispatch) => dispatch({type: APP_ACTIONS_SET, actions});


export const navigate = (path: string) =>
    async (dispatch: Dispatch) => {

        if (window.location.pathname !== path) {
            dispatchEvent(new PopStateEvent('popstate', {state: {}}));
            window.history.pushState({}, undefined, path);
        }

        dispatch({type: APP_PATH_UPDATE, path});
    };


export const toggleAppSelector = (open: boolean) =>
    async (dispatch: Dispatch) => {
        dispatch({type: APP_SELECTOR_SET, open});
    };
