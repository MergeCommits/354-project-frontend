<template>
    <v-app id="inspire">
        <navbars v-if="!this.$route.meta.hideNavigation" />

        <v-content>
            <router-view></router-view>
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
        methods: {
            updateSelf() {
                // Update our login status.
                const LOGGED_IN = 200;
                const NO_AUTH = 400;

                let call = new APICall(RequestType.GET, "users/self", null, [LOGGED_IN, NO_AUTH]);
                call.performRequest()
                    .then(response => {
                        switch (response.status) {
                            case LOGGED_IN: {
                                // TODO: Add data.
                                this.$store.commit("login");
                            } break;

                            case NO_AUTH: {
                                this.$store.commit("logout");
                            } break;
                        }
                    });
            }
        },
        created: function () {
            this.updateSelf();
        },
        watch: {
            $route() {
                this.updateSelf();
            }
        },
        computed: {
            searchColor() {
                return this.isSearchActive ? this.ACCENT_COLOR : null;
            }
        }
    };
</script>

<style scoped>
    #inspire {
        font-family: 'Roboto', sans-serif;
    }
</style>
