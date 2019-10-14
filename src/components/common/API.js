const axios = require('axios').default;

const API_URL = "http://dev.354thestars.com:8080/";

const APICAller = axios.create({
    baseURL: API_URL
});

export function axiosRequest(requestType, urlPath, jsonData) {
    return APICAller({
        method: requestType,
        url: urlPath,
        data: jsonData
    })
}

export default {
    postRequest(urlPath, jsonData) {
        return axiosRequest("post", urlPath, jsonData);
    },

    headRequest(urlPath, jsonData) {
        return axiosRequest("head", urlPath, jsonData);
    }
}