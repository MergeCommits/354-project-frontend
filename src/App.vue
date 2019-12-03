<template>
    <v-app id="inspire">
        <navbars v-if="!this.$route.meta.hideNavigation" />

        <v-content>
            <v-container v-if="!this.$store.state.selfCheckComplete" style="height: 100%; text-align: center">
                <v-row justify="center" align-content="center" style="height: 100%">
                    <v-progress-circular size="300" width="30" indeterminate :color="PRIMARY_COLOR" />
                </v-row>
            </v-container>
            <router-view v-else />
        </v-content>
    </v-app>
</template>

<script>
    import Utilities from "./components/common/Utilities"

    import NavigationBars from "./components/NavigationBars";
    import Requests from "./components/common/Requests";

    export default {
        mixins: [Utilities],
        components: {
            'navbars': NavigationBars
        },
        data: () => ({
            menuPosition: 'main',
        }),
        methods: {
            // Update our login status.
            async checkLoginStatusAsync() {
                let response = await Requests.checkSelfAsync();

                if (!response.error) {
                    if (response.status === Requests.HttpStatus.SUCCESS) {
                        this.$store.commit("login", response.data);
                    } else if (response.status === Requests.HttpStatus.BAD_REQUEST) {
                        this.$store.commit("logout");
                    }
                    this.beforeRouteEnterCallback();
                    this.$store.commit("selfChecked");
                }
            },
            beforeRouteEnterCallback() {
                let currRoute = this.$route;
                if (currRoute.meta.loginRequired && !this.$store.state.isLoggedIn) {
                    // Redirect them to login which subsequently redirects them back here.
                    this.$router.push(this.getLoginRouter());
                } else if (currRoute.meta.logoutRequired && this.$store.state.isLoggedIn) {
                    // Just send them to the homepage or redirect.
                    this.returnToRedirect();
                } else if (currRoute.meta.isAdminRequired && !this.getUserData("isAdmin")) {
                    this.returnToRedirect();
                }
            }
        },
        created: function () {
            this.checkLoginStatusAsync();
            this.updateShoppingCartAsync();
        },
        watch: {
            $route() {
                this.beforeRouteEnterCallback();
            }
        }
    }
</script>

<style scoped>
    #inspire {
        font-family: 'Roboto', sans-serif;
    }
</style>