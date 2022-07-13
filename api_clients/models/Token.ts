/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRetrieve } from './UserRetrieve';

export type Token = {
    user: UserRetrieve;
    access_token: string;
    token_type?: string;
};
