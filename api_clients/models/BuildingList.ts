/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BuildingImageRetrieve } from './BuildingImageRetrieve';
import type { PositionRetrieve } from './PositionRetrieve';
import type { UserList } from './UserList';

export type BuildingList = {
    id: number;
    name: string;
    code: string;
    zone: string;
    university_id: number;
    creator: UserList;
    position: PositionRetrieve;
    building_images: Array<BuildingImageRetrieve>;
};
