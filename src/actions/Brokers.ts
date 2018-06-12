import {APIActions} from 'origami-zen/API';
import API from 'lib/API';

export const {
    brokersCreate,
    brokersGet,
    brokersUpdate,
    brokersRemove
} = APIActions('brokers', API);
