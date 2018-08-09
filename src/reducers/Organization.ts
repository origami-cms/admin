import {ORG_THEME_SET, ORG_LOGO_SET} from 'actions/Organization';
import {AnyAction} from 'redux';
import immutable from 'seamless-immutable';
import {Organization} from 'store/state';
import color from 'color';

const initialState = immutable.from<Organization>({
    theme: {
        colorMain: false,
        colorSecondary: false
    },
    logo: null
});


export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ORG_THEME_SET:
            const s = document.documentElement.style;

            if (action.theme.colorMain) {
                // tslint:disable no-magic-numbers
                s.setProperty('--color-main', action.theme.colorMain);
                const mainFaint = color(action.theme.colorMain).fade(0.5);
                const mainDark = color(action.theme.colorMain).darken(0.5);
                const grey200 = color(action.theme.colorMain).desaturate(0.7).lighten(0.5);
                const grey300 = color(action.theme.colorMain).desaturate(0.7).lighten(0.4);
                const grey400 = color(action.theme.colorMain).desaturate(0.7);


                s.setProperty('--color-main-faint', mainFaint.toString());
                s.setProperty('--color-main-dark', mainDark.toString());
                s.setProperty('--color-grey-200', grey200.toString());
                s.setProperty('--color-grey-300', grey300.toString());
                s.setProperty('--color-grey-400', grey400.toString());
            }


            if (action.theme.colorSecondary) {
                s.setProperty('--color-alt', action.theme.colorSecondary);
            }


            if (action.theme.colorNeutral) {
                const neutral = color(action.theme.colorNeutral);
                s.setProperty('--color-bg', neutral.toString());
            }


            s.setProperty('--color-error', action.theme.colorSecondary);

            return state.set('theme', action.theme);

        case ORG_LOGO_SET:
            return state.set('logo', Number(new Date()));


        default:
            return state;
    }
};
