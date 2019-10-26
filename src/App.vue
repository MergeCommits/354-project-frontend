<template>
    <v-app id="inspire">
        <navbars v-if="!['login', 'register'].includes(this.$route.name)" />

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
        created: function () {
            this.cartItemCount = JSON.parse(localStorage.getItem("cart")).length;
        },
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
