// IMPORTANT NOTE: The object returned by Axios calls is a Promise, so any code after an API call
// will be executed asynchronously. Make sure any code that you definitely want executed after
// the request is complete is inside an attached 'then' statement.

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