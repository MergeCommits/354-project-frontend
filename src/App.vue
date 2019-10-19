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

    export default {
        mixins: [Utilities],
        components: {
            'navbars': NavigationBars
        },
        data: () => ({
            menuPosition: 'main',
        }),
        computed: {
            searchColor(){
                return this.isSearchActive ? this.ACCENT_COLOR : null
            }
        }
    };
</script>

<style scoped>
    #inspire {
        font-family: 'Roboto', sans-serif;
    }
</style>
