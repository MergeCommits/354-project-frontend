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
    import API from "./components/common/API";

    export default {
        mixins: [Utilities],
        components: {
            'navbars': NavigationBars
        },
        created: function () {
            // Update our login status.
            API.getRequest("self")
                .then(response => {
                    if (response.status === 200) {
                        // Logged in.
                        // TODO: Add data.
                        this.$store.commit("login");
                    }
                })
                .catch(() => {
                    // console.error(error);
                });
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
