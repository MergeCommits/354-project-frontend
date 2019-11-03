import {APICall, RequestType} from "./API";

export default class Requests {
    static HttpStatus = {FOUND: 200, LOGIN: 200, SUCCESS: 200, INVALID_INFO: 400, ALREADY_LOGIN: 401, NOT_FOUND: 404};

    static async registrationHeadRequest(Object, objectName) {
        return await new APICall(RequestType.HEAD, "users", Object, [this.HttpStatus.FOUND, this.HttpStatus.NOT_FOUND]).performRequest()
            .then(requestResponse => requestResponse.status === this.HttpStatus.FOUND ? ["This " + objectName + " is taken."] : [])
    }

    static async registrationPostRequest(Object) {
        return await new APICall(RequestType.POST, "users", Object, [this.HttpStatus.SUCCESS]).performRequest()
            .then(requestResponse => requestResponse.status === this.HttpStatus.SUCCESS);
    }

    static async loginPostRequest(Object) {
        return await new APICall(RequestType.POST, "auth/login", Object, [this.HttpStatus.LOGIN, this.HttpStatus.ALREADY_LOGIN, this.HttpStatus.INVALID_INFO]).performRequest();
    }

}

