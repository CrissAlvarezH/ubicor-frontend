/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_University_update_assigned_universities } from '../models/Body_University_update_assigned_universities';
import type { UniversityCreate } from '../models/UniversityCreate';
import type { UniversityList } from '../models/UniversityList';
import type { UniversityOwnershipRetrieve } from '../models/UniversityOwnershipRetrieve';
import type { UniversityRetrieve } from '../models/UniversityRetrieve';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UniversityService {

    /**
     * List
     * @param page
     * @param pageSize
     * @returns UniversityList Successful Response
     * @throws ApiError
     */
    public static universityList(
        page: number = 1,
        pageSize: number = 100,
    ): CancelablePromise<Array<UniversityList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/universities/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create
     * @param requestBody
     * @returns UniversityRetrieve Successful Response
     * @throws ApiError
     */
    public static universityCreate(
        requestBody: UniversityCreate,
    ): CancelablePromise<UniversityRetrieve> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/universities/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Retrieve
     * @param universitySlug
     * @returns UniversityRetrieve Successful Response
     * @throws ApiError
     */
    public static universityRetrieve(
        universitySlug: string,
    ): CancelablePromise<UniversityRetrieve> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/universities/{university_slug}',
            path: {
                'university_slug': universitySlug,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update
     * @param universitySlug
     * @param requestBody
     * @returns UniversityRetrieve Successful Response
     * @throws ApiError
     */
    public static universityUpdate(
        universitySlug: string,
        requestBody: UniversityCreate,
    ): CancelablePromise<UniversityRetrieve> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/universities/{university_slug}/',
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
     * @param universitySlug
     * @returns any Successful Response
     * @throws ApiError
     */
    public static universityDelete(
        universitySlug: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/universities/{university_slug}/',
            path: {
                'university_slug': universitySlug,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Retrieve Assigned Universities
     * @param userId
     * @returns UniversityOwnershipRetrieve Successful Response
     * @throws ApiError
     */
    public static universityRetrieveAssignedUniversities(
        userId: number,
    ): CancelablePromise<UniversityOwnershipRetrieve> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/universities/users/{user_id}/ownership',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Assigned Universities
     * @param userId
     * @param requestBody
     * @returns UniversityOwnershipRetrieve Successful Response
     * @throws ApiError
     */
    public static universityUpdateAssignedUniversities(
        userId: number,
        requestBody: Body_University_update_assigned_universities,
    ): CancelablePromise<UniversityOwnershipRetrieve> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/universities/users/{user_id}/ownership',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}