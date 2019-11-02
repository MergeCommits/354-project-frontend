// IMPORTANT NOTE: The object returned by Axios calls is a Promise, so any code after an API call
// will be executed asynchronously. Make sure any code that you definitely want executed after
// the request is complete is inside an attached 'then' statement.

import Utilities from "./Utilities";

const axios = require('axios').default;

/**
 * @return {string}
 */
let API_URl = function () {
    return window.location.href.includes("8080") ? "http://127.0.0.1:5000/" : "http://dev.354thestars.com:8080/";

};
const APICaller = axios.create({
    baseURL: API_URl(),
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
    HEAD: "head"
};

export class APICall {
    constructor(requestType, path, json, validResponses) {
        this.requestType = requestType;
        this.path = path;
        this.json = json;
        this.validResponses = validResponses;
    }

    performRequest() {
        let promiseRequest;
        if (Utilities.isEmpty(this.json)) {
            // Do we have any JSON data to send?
            promiseRequest = axiosRequestNoJSON(this.requestType, this.path);
        } else if (this.requestType === RequestType.GET || this.requestType === RequestType.HEAD) {
            // These request types take URL queries instead of JSON data.
            promiseRequest = axiosRequestNoJSON(this.requestType, this.path + jsonToUrl(this.json));
        } else {
            promiseRequest = axiosRequest(this.requestType, this.path, this.json);
        }

        return promiseRequest.then(response => {
                if (!this.validResponses.includes(response.status)) {
                    console.error("Unexpected Response Code:" +
                        "\nCode:" + response.status +
                        "\nData:" + JSON.stringify(response));
                }
                return response;
            }).catch(error => {
                console.error(error);
            });
    }
}
