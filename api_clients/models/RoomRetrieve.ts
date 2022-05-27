/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRetrieve } from './UserRetrieve';

export type RoomRetrieve = {
    name: string;
    code: string;
    floor: number;
    id: number;
    building_id: number;
    creator: UserRetrieve;
};
