/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PositionCreate } from './PositionCreate';

export type UniversityCreate = {
    name: string;
    slug: string;
    position: PositionCreate;
};
