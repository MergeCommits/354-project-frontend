// IMPORTANT NOTE: The object returned by Axios calls is a Promise, so any code after an API call
// will be executed asynchronously. Make sure any code that you definitely want executed after
// the request is complete is inside an attached 'then' statement.

import Utilities from "./Utilities";

const axios = require('axios').default;

/**
 * @return {string}
 */
let API_URL = function () {
    return window.location.href.includes("8080") ? "http://127.0.0.1:5000/" : "http://dev.354thestars.com:8080/";
};

const APICaller = axios.create({
    baseURL: API_URL(),
    withCredentials: true,
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    }
});

function axiosRequest(requestType, urlPath, jsonData) {
    return APICaller({
        method: requestType,
        url: urlPath,
        data: jsonData
    })
}

function axiosRequestNoJSON(requestType, urlPath) {
    return APICaller({
        method: requestType,
        url: urlPath
    })
}

// Map a JSON object to a URL query.
function jsonToUrl(jsonData) {
    return "?" + Object.keys(jsonData).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(jsonData[k])
    }).join('&').toString();
}

export const RequestType = {
    GET: "get",
    POST: "post",
    HEAD: "head",
    PUT: "put",
    DELETE: "delete"
};

export class APICall {
    error = false;
    data = null;

    constructor(requestType, path, json, validResponses) {
        this.requestType = requestType;
        this.path = path;
        this.json = json;
        this.validResponses = validResponses;
    }

    async performRequest() {
        let request;
        if (Utilities.isEmpty(this.json)) {
            // Do we have any JSON data to send?
            request = axiosRequestNoJSON(this.requestType, this.path);
        } else if (this.requestType === RequestType.GET || this.requestType === RequestType.HEAD) {
            // These request types take URL queries instead of JSON data.
            request = axiosRequestNoJSON(this.requestType, this.path + jsonToUrl(this.json));
        } else {
            request = axiosRequest(this.requestType, this.path, this.json);
        }

        try {
            const response = await request;

            if (!this.validResponses.includes(response.status)) {
                console.error("Unexpected Response Code:" +
                    "\nCode:" + response.status +
                    "\nData:" + JSON.stringify(response));

                this.error = true;
                return;
            }

            this.status = response.status;
            this.data = response.data;
            this.error = false;
        } catch (error) {
            console.error(error);
            this.error = true;
        }
    }
}
