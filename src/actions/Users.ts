import {APIActions} from 'origami-zen/API';
import API from 'lib/API';

export const USERS_SET = 'USERS_SET';
export const USERS_CREATED = 'USERS_CREATED';
export const USERS_UPDATED = 'USERS_UPDATED';
export const USERS_REMOVED = 'USERS_REMOVED';


export const {
    usersCreate,
    usersGet,
    usersUpdate,
    usersRemove
} = APIActions('users', API);
