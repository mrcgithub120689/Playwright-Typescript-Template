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

    // Method to fetch objects from the API
    async getObjectById(id: string): Promise<any> {
        // Create a new API request context
        // This context is used to make HTTP requests
        this.apiRequestContext = await request.newContext();

        // Perform a GET request to the specified requestUri
        this.requestUri = baseURI + `/${id}`;
        this.apiResponse = await this.apiRequestContext.get(this.requestUri);

        // Assert that the response status is 200 (OK)
        // This ensures that the request was successful
        expect(this.apiResponse.status()).toBe(200);

        // Parse and return the JSON body from the response
        return this.apiResponse.json();
    }
}


//NOTES
// // generate token for authorization
// export async function generateToken(): Promise<JSON> {
//     const response = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
//         method: 'POST',
//         body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=${scope}`,
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     });

//     const responseJson = await response.json();
//     expect(responseJson["access_token"]).toBeTruthy();
//     expect(responseJson["token_type"]).toBeTruthy();

//     return responseJson;
// }

        // use this line if you need special authorization and headers
        // this.apiRequestContext = await request.newContext({extraHTTPHeaders: {Authorization: `${this.tokenResponse["token_type"]} ${this.tokenResponse["access_token"]}`, 
        //     "Content-Type": `application/json`,
        //     "If-Match": `*`
        // }});

// use this line if request has payload
// this.apiResponse = await (this.apiRequestContext).post(this.requestUri, {data: payload});