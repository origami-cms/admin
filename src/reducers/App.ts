import {App as actions} from 'actions';
import {TITLE_PREFIX} from 'const';
import {AnyAction} from 'redux';
import immutable from 'seamless-immutable';
import {App} from 'store/state';
import {APP_SELECTOR_SET} from 'actions/App';

const {
    APP_SIDEBAR_ITEMS_SET,
    APP_TITLE_SET,
    APP_PATH_UPDATE
} = actions;


const initialState = immutable.from<App>({
    sidebar: {
        items: []
    },
    page: {
        title: '',
        path: window.location.pathname
    },
    appSelector: {
        open: false
    }
});


export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case APP_PATH_UPDATE:
            return state.setIn(['page', 'path'], action.path);

        case APP_SIDEBAR_ITEMS_SET:
            return state.setIn(['sidebar', 'items'], action.items);

        case APP_TITLE_SET:
            document.title = TITLE_PREFIX + action.title;

            return state.setIn(['page', 'title'], action.title);

        case APP_SELECTOR_SET:
            return state.setIn(['appSelector', 'open'], action.open);

        default:
            return state;
    }
};
