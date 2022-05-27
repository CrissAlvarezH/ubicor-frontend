/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BuildingList } from './BuildingList';
import type { PositionRetrieve } from './PositionRetrieve';

export type UniversityRetrieve = {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    created_by: number;
    position_id: number;
    position: PositionRetrieve;
    buildings: Array<BuildingList>;
};
