/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserRetrieve = {
    id: number;
    full_name: string;
    email: string;
    scopes: Array<string>;
    provider: string;
    is_active: boolean;
};
