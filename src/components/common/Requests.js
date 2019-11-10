import {APICall, RequestType} from "./API";

export default class Requests {
    static HttpStatus = {
        SUCCESS: 200, BAD_REQUEST: 400, UNAUTHORIZED: 401, NOT_FOUND: 404
    };

    static async checkSelfAsync() {
        let call = new APICall(RequestType.GET, "users/self", null, [this.HttpStatus.SUCCESS, this.HttpStatus.BAD_REQUEST]);
        await call.performRequestAsync();
        return call;
    }

    static async registrationHeadRequest(Object, objectName) {
        return await new APICall(RequestType.HEAD, "users", Object, [this.HttpStatus.FOUND, this.HttpStatus.NOT_FOUND]).performRequest()
            .then(requestResponse => requestResponse.status === this.HttpStatus.FOUND ? ["This " + objectName + " is taken."] : [])
    }

    static async registrationPostRequest(Object) {
        return await new APICall(RequestType.POST, "users", Object, [this.HttpStatus.SUCCESS]).performRequest()
            .then(requestResponse => requestResponse.status === this.HttpStatus.SUCCESS);
    }

    static async loginAsync(jsonData) {
        let call = new APICall(RequestType.POST, "auth/login", jsonData, [this.HttpStatus.SUCCESS, this.HttpStatus.BAD_REQUEST, this.HttpStatus.UNAUTHORIZED]);
        await call.performRequestAsync();
        return call;
    }

    static async logoutAsync() {
        let call = new APICall(RequestType.GET, "auth/logout", null, [this.HttpStatus.SUCCESS, this.HttpStatus.BAD_REQUEST]);
        await call.performRequestAsync();
        return call;
    }

    static async getShoppingCartAsync() {
        let call = new APICall(RequestType.GET, "carts/mine", null, [this.HttpStatus.SUCCESS, this.HttpStatus.BAD_REQUEST]);
        await call.performRequestAsync();
        return call;
    }

    static async updateCartLineAsync(jsonData) {
        let call = new APICall(RequestType.PUT, "carts/mine/items", jsonData, [this.HttpStatus.SUCCESS, this.HttpStatus.BAD_REQUEST]);
        await call.performRequestAsync();
        return call;
    }
}

