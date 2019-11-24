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

    static async updateSelfAsync(jsonData) {
        let call = new APICall(RequestType.PATCH, "users/self", jsonData, [this.HttpStatus.SUCCESS]);
        await call.performRequestAsync();
        return call;
    }

    static async registrationHeadAsync(jsonData, dataName) {
        let call = new APICall(RequestType.HEAD, "users", jsonData, [this.HttpStatus.SUCCESS, this.HttpStatus.NOT_FOUND]);
        await call.performRequestAsync();
        if (call.status === this.HttpStatus.SUCCESS) {
            return ["This " + dataName + " is taken."];
        }
        return [];
    }

    static async registrationPostAsync(Object) {
        let call = new APICall(RequestType.POST, "users", Object, [this.HttpStatus.SUCCESS]);
        await call.performRequestAsync();
        return call;
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

    static async queryCategoriesAsync() {
        let call = new APICall(RequestType.GET, "categories", null, [this.HttpStatus.SUCCESS]);
        await call.performRequestAsync();
        return call;
    }

    static async queryBrandsAsync() {
        let call = new APICall(RequestType.GET, "brands", null, [this.HttpStatus.SUCCESS]);
        await call.performRequestAsync();
        return call;
    }

    static async createProductAsync(jsonData) {
        let call = new APICall(RequestType.POST, "products", jsonData, [this.HttpStatus.SUCCESS]);
        await call.performRequestAsync();
        return call;
    }

    static async queryProductAsync(url) {
        let call = new APICall(RequestType.GET, url, null, [this.HttpStatus.SUCCESS, this.HttpStatus.NOT_FOUND]);
        await call.performRequestAsync();
        return call;
    }

    static async createShoppingCartAsync() {
        let call = new APICall(RequestType.POST, "carts", null, [this.HttpStatus.SUCCESS]);
        await call.performRequestAsync();
        return call;
    }

    static async addItemToCartAsync(jsonData) {
        let call = new APICall(RequestType.POST, "carts/mine/items", jsonData, [this.HttpStatus.SUCCESS]);
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


    static async removeItemFromCartAsync(url) {
        let call = new APICall(RequestType.DELETE, url, null, [this.HttpStatus.SUCCESS]);
        await call.performRequestAsync();
        return call;
    }

    static async checkoutAsync(jsonData) {
        let call = new APICall(RequestType.POST, "orders", jsonData, [this.HttpStatus.SUCCESS, this.HttpStatus.BAD_REQUEST]);
        await call.performRequestAsync();
        return call;
    }

    static async searchQueryAsync(queryString) {
        let call = new APICall(RequestType.GET, 'products' + queryString, null, [this.HttpStatus.SUCCESS]);
        await call.performRequestAsync();
        return call;
    }

    static async addShippingAddress(jsonData) {
        let call = new APICall(RequestType.PUT, "addresses", jsonData, [this.HttpStatus.SUCCESS, this.HttpStatus.BAD_REQUEST]);
        await call.performRequestAsync();
        return call;
    }

    static async updateShippingAddress(jsonData) {
        let call = new APICall(RequestType.PATCH, "addresses", jsonData, [this.HttpStatus.SUCCESS, this.HttpStatus.BAD_REQUEST]);
        await call.performRequestAsync();
        return call;
    }

    static async deleteShippingAddress(jsonData) {
        let call = new APICall(RequestType.DELETE, "addresses", jsonData, [this.HttpStatus.SUCCESS, this.HttpStatus.BAD_REQUEST]);
        await call.performRequestAsync();
        return call;
    }
}

