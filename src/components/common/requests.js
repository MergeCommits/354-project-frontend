import {APICall, RequestType} from "./API";

const HttpStatus = {FOUND: 200, NOT_FOUND: 404, SUCCESS: 200};

async function headRequest(Object, objectName) {
    const request = new APICall(RequestType.HEAD, "users", Object, [HttpStatus.FOUND, HttpStatus.NOT_FOUND]);
    return await request.performRequest().then(requestResponse => requestResponse.status === HttpStatus.FOUND ? ["This " + objectName + " is taken."] : [])
}

async function postRequest(Object) {
    const request = new APICall(RequestType.POST, "users", Object, [HttpStatus.SUCCESS]);
    return await request.performRequest().then(requestResponse => requestResponse.status === HttpStatus.SUCCESS);
}

