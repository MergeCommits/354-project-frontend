import {APICall, RequestType} from "./API";

const HttpStatus = {FOUND: 200, NOT_FOUND: 404, SUCCESS: 200};

function headRequest(Object, objectName) {
    let userNameErrors;
    const request = new APICall(RequestType.HEAD, "users", Object, [HttpStatus.FOUND, HttpStatus.NOT_FOUND]);
    request.performRequest().then(requestResponse => userNameErrors = requestResponse.status === HttpStatus.FOUND ? ["This " + objectName + " is taken."] : []);
    return userNameErrors;
}

function postRequest(Object) {
    let isRequestValid;
    const request = new APICall(RequestType.POST, "users", Object, [HttpStatus.SUCCESS]);
    request.performRequest().then(requestResponse => isRequestValid = requestResponse.status === HttpStatus.SUCCESS ? isRequestValid = true : isRequestValid = false);
    return isRequestValid;
}

