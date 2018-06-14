import {APPS_SET} from 'actions/Apps';
import {AnyAction} from 'redux';
import immutable, {ImmutableArray} from 'seamless-immutable';
import {AppDetail, Apps} from 'store/state';


const initialState = immutable<Apps>({
    apps: []
});


export default (state = initialState, action: AnyAction) => {
    const findIndexByName = (app: AppDetail) =>
        state.asMutable().apps.findIndex(a => a.name === app.name);

    switch (action.type) {
        case APPS_SET:
            // If there is no app, return state
            if (!action.apps) return state;

            let updated = state;

            action.apps.forEach((app: AppDetail) => {
                const existing = findIndexByName(app);

                // If there is an existing app that matches the id,
                // then update it
                if (existing >= 0) {
                    updated = updated.setIn(['apps', existing.toString()], {
                        ...state.apps[existing],
                        ...app
                    });

                    // Otherwise merge the resource into the array
                } else {
                    updated = updated.merge({
                        apps: [
                            ...updated.apps as ImmutableArray<any>,
                            app
                        ]
                    });
                }
            });

            return updated;


        default:
            return state;
    }
};
