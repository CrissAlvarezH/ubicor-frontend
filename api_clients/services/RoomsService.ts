/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RoomCreate } from '../models/RoomCreate';
import type { RoomRetrieve } from '../models/RoomRetrieve';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoomsService {

    /**
     * List
     * @param buildingId
     * @returns RoomRetrieve Successful Response
     * @throws ApiError
     */
    public static roomsList(
        buildingId: number,
    ): CancelablePromise<Array<RoomRetrieve>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}/rooms/',
            path: {
                'building_id': buildingId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create
     * @param universitySlug
     * @param buildingId
     * @param requestBody
     * @returns RoomRetrieve Successful Response
     * @throws ApiError
     */
    public static roomsCreate(
        universitySlug: string,
        buildingId: number,
        requestBody: RoomCreate,
    ): CancelablePromise<RoomRetrieve> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}/rooms/',
            path: {
                'university_slug': universitySlug,
                'building_id': buildingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Retrieve
     * @param roomId
     * @returns RoomRetrieve Successful Response
     * @throws ApiError
     */
    public static roomsRetrieve(
        roomId: number,
    ): CancelablePromise<RoomRetrieve> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}/rooms/{room_id}',
            path: {
                'room_id': roomId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update
     * @param universitySlug
     * @param roomId
     * @param requestBody
     * @returns RoomRetrieve Successful Response
     * @throws ApiError
     */
    public static roomsUpdate(
        universitySlug: string,
        roomId: number,
        requestBody: RoomCreate,
    ): CancelablePromise<RoomRetrieve> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}/rooms/{room_id}/',
            path: {
                'university_slug': universitySlug,
                'room_id': roomId,
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
     * @param universitySlug
     * @param roomId
     * @returns RoomRetrieve Successful Response
     * @throws ApiError
     */
    public static roomsDelete(
        universitySlug: string,
        roomId: number,
    ): CancelablePromise<RoomRetrieve> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}/rooms/{room_id}/',
            path: {
                'university_slug': universitySlug,
                'room_id': roomId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * List Standalone
     * @param search
     * @returns RoomRetrieve Successful Response
     * @throws ApiError
     */
    public static roomsListStandalone(
        search?: string,
    ): CancelablePromise<Array<RoomRetrieve>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rooms/',
            query: {
                'search': search,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}