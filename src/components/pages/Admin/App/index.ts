import {appGet, appGetPage} from 'actions/Apps';
import deepequal from 'deep-equal';
import Router from 'lib/Router';
import {Origami} from 'origami-core-lib';
import {component, property} from 'origami-zen/util';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {AppDetail} from 'store/state';


interface props {
    appName?: string;
    app?: AppDetail;
}

@component('page-app')
export default class PageResource extends connect(store)(Router) implements props {
    @property
    appName?: string;

    @property
    app?: AppDetail;

    base = '/admin';

    @property
    get routes() {
        if (!this.app || !this.app.pages) return [];
        return Object.entries(this.app.pages).map(([path, element]) => ({path, element}));
    }
    set routes(v) {}

    async _firstRendered() {
        if (!this.appName) throw new Error('page-app needs a appName property');
        const app = await store.dispatch(appGet(this.appName)) as Origami.AppManifest;

        const pagePromises: Promise<any>[] = [];
        if (app) {
            app.pages.forEach(p => {
                pagePromises.push(store.dispatch(appGetPage(this.appName as string, p)));
            });
        }

        await Promise.all(pagePromises);

        // @ts-ignore Added by router
        this._update();
    }


    _stateChanged(s: State) {
        const newApp = s.Apps.apps[this.appName || ''];
        if (!this.app && newApp ||
            this.app && !this.app.pages ||
            this.app && !deepequal(this.app.pages, newApp.pages)
        ) {
            // @ts-ignore
            this.app = newApp.asMutable({deep: true});
            // @ts-ignore Added by router
            this._update();
        }
    }
}
