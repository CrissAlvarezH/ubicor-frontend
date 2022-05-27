/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BuildingImageRetrieve } from './BuildingImageRetrieve';
import type { PositionRetrieve } from './PositionRetrieve';
import type { RoomRetrieve } from './RoomRetrieve';
import type { UserRetrieve } from './UserRetrieve';

export type BuildingRetrieve = {
    id: number;
    name: string;
    code: string;
    zone: string;
    university_id: number;
    creator: UserRetrieve;
    position: PositionRetrieve;
    building_images: Array<BuildingImageRetrieve>;
    rooms: Array<RoomRetrieve>;
};
