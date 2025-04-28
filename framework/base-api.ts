import { APIRequestContext, APIResponse } from "@playwright/test";

export default class BaseApi {
    apiRequestContext!: APIRequestContext;
    apiResponse!: APIResponse;
    requestUri!: string;
    jsonResponse!: JSON;
    endPoint!: string;
}