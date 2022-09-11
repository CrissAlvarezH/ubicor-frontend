/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_Buildings_create_building_images } from '../models/Body_Buildings_create_building_images';
import type { Body_Buildings_update_building_image } from '../models/Body_Buildings_update_building_image';
import type { BuildingCreate } from '../models/BuildingCreate';
import type { BuildingList } from '../models/BuildingList';
import type { BuildingRetrieve } from '../models/BuildingRetrieve';
import type { ImageRetrieve } from '../models/ImageRetrieve';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BuildingsService {

    /**
     * List
     * @param universitySlug
     * @returns BuildingList Successful Response
     * @throws ApiError
     */
    public static buildingsList(
        universitySlug: string,
    ): CancelablePromise<Array<BuildingList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/universities/{university_slug}/buildings/',
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
     * @returns BuildingList Successful Response
     * @throws ApiError
     */
    public static buildingsCreate(
        universitySlug: string,
        requestBody: BuildingCreate,
    ): CancelablePromise<BuildingList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/universities/{university_slug}/buildings/',
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
     * Retrieve
     * @param buildingId
     * @returns BuildingRetrieve Successful Response
     * @throws ApiError
     */
    public static buildingsRetrieve(
        buildingId: number,
    ): CancelablePromise<BuildingRetrieve> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}',
            path: {
                'building_id': buildingId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update
     * @param universitySlug
     * @param buildingId
     * @param requestBody
     * @returns BuildingList Successful Response
     * @throws ApiError
     */
    public static buildingsUpdate(
        universitySlug: string,
        buildingId: number,
        requestBody: BuildingCreate,
    ): CancelablePromise<BuildingList> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}/',
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
     * Delete
     * @param universitySlug
     * @param buildingId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static buildingsDelete(
        universitySlug: string,
        buildingId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}/',
            path: {
                'university_slug': universitySlug,
                'building_id': buildingId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Building Images
     * @param universitySlug
     * @param buildingId
     * @param formData
     * @returns BuildingRetrieve Successful Response
     * @throws ApiError
     */
    public static buildingsCreateBuildingImages(
        universitySlug: string,
        buildingId: number,
        formData: Body_Buildings_create_building_images,
    ): CancelablePromise<BuildingRetrieve> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}/images/',
            path: {
                'university_slug': universitySlug,
                'building_id': buildingId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Building Image
     * @param imageId
     * @param universitySlug
     * @param buildingId
     * @param formData
     * @returns ImageRetrieve Successful Response
     * @throws ApiError
     */
    public static buildingsUpdateBuildingImage(
        imageId: number,
        universitySlug: string,
        buildingId: number,
        formData: Body_Buildings_update_building_image,
    ): CancelablePromise<ImageRetrieve> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}/images/{image_id}/',
            path: {
                'image_id': imageId,
                'university_slug': universitySlug,
                'building_id': buildingId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Remove Building Image
     * @param imageId
     * @param universitySlug
     * @param buildingId
     * @returns BuildingRetrieve Successful Response
     * @throws ApiError
     */
    public static buildingsRemoveBuildingImage(
        imageId: number,
        universitySlug: string,
        buildingId: number,
    ): CancelablePromise<BuildingRetrieve> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}/images/{image_id}/',
            path: {
                'image_id': imageId,
                'university_slug': universitySlug,
                'building_id': buildingId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Remove All Building Images
     * @param universitySlug
     * @param buildingId
     * @returns BuildingRetrieve Successful Response
     * @throws ApiError
     */
    public static buildingsRemoveAllBuildingImages(
        universitySlug: string,
        buildingId: number,
    ): CancelablePromise<BuildingRetrieve> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/universities/{university_slug}/buildings/{building_id}/images/all/',
            path: {
                'university_slug': universitySlug,
                'building_id': buildingId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}