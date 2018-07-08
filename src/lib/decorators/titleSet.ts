import store, {State} from 'store';
import {titleSet} from 'actions/App';


export default (title: string) =>
    <T extends { new(...args: any[]): {} }>(constructor: T) =>
        class TitleSet extends constructor {
            _firstRendered = () => {
                // @ts-ignore
                super._firstRendered();
                store.dispatch<any>(titleSet(title));
            }
        };
