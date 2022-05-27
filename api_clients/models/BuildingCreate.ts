/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PositionCreate } from './PositionCreate';

export type BuildingCreate = {
    name: string;
    code: string;
    zone: string;
    position: PositionCreate;
};
