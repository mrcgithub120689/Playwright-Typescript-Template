import { expect, request } from "@playwright/test";
import BaseApi from "../../../framework/base-api";

const baseURI = 'https://api.restful-api.dev/objects';

export default class RestfulApiDevApi extends BaseApi {

    // Method to fetch objects from the API
    async getObjects(): Promise<any> {
        // Create a new API request context
        // This context is used to make HTTP requests
        this.apiRequestContext = await request.newContext();

        // Perform a GET request to the specified baseURI
        this.apiResponse = await this.apiRequestContext.get(baseURI);

        // Assert that the response status is 200 (OK)
        // This ensures that the request was successful
        expect(this.apiResponse.status()).toBe(200);

        // Parse and return the JSON body from the response
        return this.apiResponse.json();
    }
}
