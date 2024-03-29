/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuildingZoneCreate } from '../models/BuildingZoneCreate';
import type { BuildingZoneRetrieve } from '../models/BuildingZoneRetrieve';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BuildingZonesService {

    /**
     * List
     * @param universitySlug
     * @returns BuildingZoneRetrieve Successful Response
     * @throws ApiError
     */
    public static buildingZonesList(
        universitySlug: string,
    ): CancelablePromise<Array<BuildingZoneRetrieve>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/universities/{university_slug}/building-zones',
            path: {
                'university_slug': universitySlug,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create
     * @param universitySlug
     * @param requestBody
     * @returns BuildingZoneRetrieve Successful Response
     * @throws ApiError
     */
    public static buildingZonesCreate(
        universitySlug: string,
        requestBody: BuildingZoneCreate,
    ): CancelablePromise<BuildingZoneRetrieve> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/universities/{university_slug}/building-zones/',
            path: {
                'university_slug': universitySlug,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete
     * @param buildingZoneId
     * @param universitySlug
     * @returns any Successful Response
     * @throws ApiError
     */
    public static buildingZonesDelete(
        buildingZoneId: number,
        universitySlug: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/universities/{university_slug}/building-zones/{building_zone_id}/',
            path: {
                'building_zone_id': buildingZoneId,
                'university_slug': universitySlug,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}