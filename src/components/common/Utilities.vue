<script>
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
                return "/logout?redirect=" + this.$router.currentRoute.name;
            },
            // Returns the route a given page should go to in order to login and return to the same page.
            getLoginRouter() {
                return "/login?redirect=" + this.$router.currentRoute.name;
            },
            getUserData(key) {
                return this.$store.state.currUser[key];
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
