<script>
    export default {
        name: "Utilities",
        data: () => ({
            PRIMARY_COLOR: "#00838F",
            ACCENT_COLOR: "#FF8F00",
            BASIC_GREY: "#9E9E9E"
        }),
        methods: {
            // Return to the previous page if one existed.
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/")
            },
            // Returns the route a given page should go to in order to logout and return to the same page.
            getLogoutRouter() {
                return "/logout?redirect=" + this.$router.currentRoute.name;
            }
        },

        // Misc. free functions.
        clone(object) {
            return JSON.parse(JSON.stringify(object));
        },
        isEmpty(object) {
            return object === undefined || object === null || object.length === 0 || object === "";
        }
    }
</script>

<style scoped>

</style>
