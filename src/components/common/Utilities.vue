<script>
    import {APICall, RequestType} from "./API";

    const utils = {
        name: "Utilities",
        data: () => ({
            PRIMARY_COLOR: "#00838F",
            ACCENT_COLOR: "#FF8F00",
            BASIC_GREY: "#9E9E9E"
        }),
        methods: {
            // Return to the previous page if one existed.
            goBack() {
                if (!utils.isEmpty(this.$route.meta.prevRoute.query.redirect)) {
                    this.$router.push("/home");
                } else {
                    window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
                }
            },
            // Return to requested redirect, otherwise homepage.
            returnToRedirect() {
                let retPath = this.$route.query.redirect;
                if (!utils.isEmpty(retPath)) {
                    this.$router.push("/" + retPath);
                } else {
                    this.$router.push("/home");
                }
            },
            // Returns the route a given page should go to in order to logout and return to the same page.
            getLogoutRouter() {
                return "/logout?redirect=" + this.$route.path;
            },
            // Returns the route a given page should go to in order to login and return to the same page.
            getLoginRouter() {
                return "/login?redirect=" + this.$route.path;
            },
            getUserData(key) {
                return this.$store.state.currUser[key];
            },
            async updateShoppingCart() {
                this.$store.commit("startCartLoad");

                const CART_FOUND = 200;
                const CART_NOT_FOUND = 400;

                let call = new APICall(RequestType.GET, "carts/mine", null, [CART_FOUND, CART_NOT_FOUND]);
                call.performRequest()
                    .then(response => {
                        switch (response.status) {
                            case CART_FOUND: {
                                this.$store.commit("setShoppingCart", response.data);
                                this.$store.commit("stopCartLoad");
                            } break;
                            case CART_NOT_FOUND: {
                                this.$store.commit("stopCartLoad");
                            } break;
                        }
                    });
            }
        },

        // Misc. free functions.
        clone(object) {
            return JSON.parse(JSON.stringify(object));
        },
        isEmpty(object) {
            return object === undefined || object === null || object.length === 0 || object === "";
        }
    };

    export default utils;
</script>

<style scoped>

</style>
