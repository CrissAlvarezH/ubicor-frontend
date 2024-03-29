/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_Auth_login } from '../models/Body_Auth_login';
import type { Body_Auth_token_sign_in } from '../models/Body_Auth_token_sign_in';
import type { Token } from '../models/Token';
import type { UserCreate } from '../models/UserCreate';
import type { UserRetrieve } from '../models/UserRetrieve';
import type { UserUpdate } from '../models/UserUpdate';

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
     * Token Sign In
     * @param requestBody
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static authTokenSignIn(
        requestBody: Body_Auth_token_sign_in,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/token-sign-in',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * User List
     * @returns UserRetrieve Successful Response
     * @throws ApiError
     */
    public static authUserList(): CancelablePromise<Array<UserRetrieve>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users',
        });
    }

    /**
     * User Edit
     * @param userId
     * @param requestBody
     * @returns UserRetrieve Successful Response
     * @throws ApiError
     */
    public static authUserEdit(
        userId: number,
        requestBody: UserUpdate,
    ): CancelablePromise<UserRetrieve> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users/{user_id}/',
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