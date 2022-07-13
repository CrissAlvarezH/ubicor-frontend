/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_Auth_login } from '../models/Body_Auth_login';
import type { OAuthUserCreate } from '../models/OAuthUserCreate';
import type { Token } from '../models/Token';
import type { UserCreate } from '../models/UserCreate';
import type { UserRetrieve } from '../models/UserRetrieve';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login
     * @param formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static authLogin(
        formData: Body_Auth_login,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Register
     * @param requestBody
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static authRegister(
        requestBody: UserCreate,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Getorcreateuser
     * @param requestBody
     * @returns UserRetrieve Successful Response
     * @throws ApiError
     */
    public static authGetOrCreateUser(
        requestBody: OAuthUserCreate,
    ): CancelablePromise<UserRetrieve> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/get-or-create-user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}