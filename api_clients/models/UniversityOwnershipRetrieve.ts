/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRetrieve } from './UserRetrieve';

export type UniversityOwnershipRetrieve = {
    user: UserRetrieve;
    university_slugs: Array<string>;
};
