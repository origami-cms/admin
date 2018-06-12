export {ImmutableObject} from 'seamless-immutable';

export default interface State {
    App: App;
    Broker: Broker;
    Quote: QuoteWithLoader;
    Setup: Setup;
    Me: Me;
    Auth: Auth;
}
export interface Loader {
    _loading: {
        get?: boolean;
        post?: boolean;
    };
    _errors: {
        get: string | boolean;
        post: string | boolean;
    };
}

export interface Page {
    id?: string;
    children?: Page[];
}

export interface Setup {
    setup: boolean;
    user: boolean;
    errors: {
        user: boolean
    };
    loading: {
        user: boolean
    };
}

export interface Auth {
    verified: null | boolean;
    loggedIn: boolean;
    token?: string | null;
    loading: {
        verifying: boolean,
        loggingIn: boolean
    };
    errors: {
        loggingIn: null | string,
        verify: null | string
    };
}

export interface App {
    page: {
        title: string,
        path: string
    };
    sidebar: {
        items: object[]
    };
}

export interface BrokerDetails {
    id: string | boolean;
    bannerImage: string | boolean;
    fontFamily: string | boolean;
    logo: string | boolean;
    colorMain: string | boolean;
    colorNeutral: string | boolean;
    colorSecondary: string | boolean;
    avatarName?: string;
    nextSteps?: string;
}

export interface Broker extends Loader {
    broker: BrokerDetails;
}

export interface Quote {
    quote: QuoteDetails;
    address?: string;
}

export interface QuoteDetails {
    quoteId: string | boolean;
    coverages: {
        excessLimit: number
        frequency: 'Monthly Premium' | 'Annual Premium'
        premium: number
    }[];
}

export interface QuoteWithLoader extends Quote, Loader {}


export interface Me {
    id: null | string;
    fname: null | string;
    lname: null | string;
    email: null | string;
}
