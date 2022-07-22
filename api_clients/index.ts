/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { Body_Auth_login } from './models/Body_Auth_login';
export type { Body_Buildings_create_building_images } from './models/Body_Buildings_create_building_images';
export type { Body_Buildings_update_building_image } from './models/Body_Buildings_update_building_image';
export type { BuildingCreate } from './models/BuildingCreate';
export type { BuildingImageRetrieve } from './models/BuildingImageRetrieve';
export type { BuildingList } from './models/BuildingList';
export type { BuildingRetrieve } from './models/BuildingRetrieve';
export type { BuildingZoneCreate } from './models/BuildingZoneCreate';
export type { BuildingZoneRetrieve } from './models/BuildingZoneRetrieve';
export type { HTTPValidationError } from './models/HTTPValidationError';
export type { ImageRetrieve } from './models/ImageRetrieve';
export type { OAuthUserCreate } from './models/OAuthUserCreate';
export type { PositionCreate } from './models/PositionCreate';
export type { PositionRetrieve } from './models/PositionRetrieve';
export type { RoomCreate } from './models/RoomCreate';
export type { RoomRetrieve } from './models/RoomRetrieve';
export type { Token } from './models/Token';
export type { UniversityCreate } from './models/UniversityCreate';
export type { UniversityList } from './models/UniversityList';
export type { UniversityRetrieve } from './models/UniversityRetrieve';
export type { UserCreate } from './models/UserCreate';
export type { UserRetrieve } from './models/UserRetrieve';
export type { ValidationError } from './models/ValidationError';

export { AuthService } from './services/AuthService';
export { BuildingsService } from './services/BuildingsService';
export { BuildingZonesService } from './services/BuildingZonesService';
export { RoomsService } from './services/RoomsService';
export { UniversityService } from './services/UniversityService';
