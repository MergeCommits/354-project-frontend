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
    import {RequestType, APICall} from "./components/common/API";

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
            updateSelf() {
                const LOGGED_IN = 200;
                const NO_AUTH = 400;

                let call = new APICall(RequestType.GET, "users/self", null, [LOGGED_IN, NO_AUTH]);
                call.performRequest()
                    .then(response => {
                        switch (response.status) {
                            case LOGGED_IN: {
                                // Send the user data to the store.
                                this.$store.commit("login", response.data);
                                this.beforeRouteEnterCallback();
                                this.$store.commit("selfChecked");
                            } break;

                            case NO_AUTH: {
                                this.$store.commit("logout");
                                this.beforeRouteEnterCallback();
                                this.$store.commit("selfChecked");
                            } break;
                        }
                    });
            },
            beforeRouteEnterCallback() {
                let currRoute = this.$route;
                if (currRoute.meta.loginRequired && !this.$store.state.isLoggedIn) {
                    // Redirect them to login which subsequently redirects them back here.
                    this.$router.push(this.getLoginRouter());
                } else if (currRoute.meta.logoutRequired && this.$store.state.isLoggedIn) {
                    // Just send them to the homepage or redirect.
                    this.returnToRedirect();
                }
            }
        },
        created: function () {
            this.updateSelf();
            this.updateShoppingCart();
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