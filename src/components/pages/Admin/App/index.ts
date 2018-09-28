import {appGet, appGetPage} from 'actions/Apps';
import deepequal from 'deep-equal';
import Router from 'lib/Router';
import {Origami} from 'origami-core-lib';
import {component, property} from '@origamijs/zen-lib';
import {connect} from 'pwa-helpers/connect-mixin';
import store, {State} from 'store';
import {AppDetail} from 'store/state';
import { html } from '@polymer/lit-element';
import CSS from './page-app-css';

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

    get sidemenu() {

        if (this.app && this.app.manifest.sidemenu) {
            const links = this.app.manifest.pages!.map(p => ({
                icon: p.icon,
                to: p.path,
                text: p.title
            }));
            return html`<ui-side-menu .links=${links}></ui-side-menu>`;

        } return null;
    }

    async _firstRendered() {
        console.log('setting up page-app');

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

    render(props: any) {
        const page = super.render(props);

        return html`
            ${CSS}
            ${this.sidemenu}
            <section>${page}</section>
        `;
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
