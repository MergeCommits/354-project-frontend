// IMPORTANT NOTE: The object returned by Axios calls is a Promise, so any code after an API call
// will be executed asynchronously. Make sure any code that you definitely want executed after
// the request is complete is inside an attached 'then' statement.

const axios = require('axios').default;

// const API_URL = "http://dev.354thestars.com:8080/";
const API_URL = "http://127.0.0.1:5000/";

const APICaller = axios.create({
    baseURL: API_URL
});

function axiosRequest(requestType, urlPath, jsonData) {
    return APICaller({
        method: requestType,
        url: urlPath,
        data: jsonData
    })
}

// Map a JSON object to a URL query.
function jsonToUrl(jsonData) {
    return "?" + Object.keys(jsonData).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(jsonData[k])
    }).join('&').toString();
}

export default {
    postRequest(urlPath, jsonData) {
        return axiosRequest("post", urlPath, jsonData);
    },

    getRequest(urlPath, jsonData) {
        let urlQueries = jsonToUrl(jsonData);
        return axiosRequest("get", urlPath + urlQueries);
    },
    getRequestNoData(urlPath) {
        return axiosRequest("get", urlPath);
    },

    headRequest(urlPath, jsonData) {
        let urlQueries = jsonToUrl(jsonData);
        return axiosRequest("head", urlPath + urlQueries);
    }
}