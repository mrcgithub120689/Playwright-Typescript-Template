import { APIRequestContext, APIResponse } from "@playwright/test";

export default class BaseApi {
    tokenResponse: JSON;
    apiRequestContext: APIRequestContext;
    endPoint: string;
    requestUri: string;
    apiResponse: APIResponse;
}