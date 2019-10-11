<template>
    <v-app id="inspire">
        <navbars v-if="!['login', 'register'].includes(this.$route.name)" />

        <v-content>
            <router-view></router-view>

<!--            <account-updation v-if="menuPosition === 'accountUpdation'"></account-updation>-->

        </v-content>
    </v-app>
</template>

<script>
    import AccountCreation from "./views/AccountCreation"
    import Login from "./views/Login"
    import Main from "./components/Main"
    import Utilities from "./components/common/Utilities"
    import AccountUpdation from "./components/AccountUpdation"

    import NavigationBars from "./components/NavigationBars";

    export default {
        mixins: [Utilities],
        components: {
            'navbars': NavigationBars,
            'account-creation': AccountCreation,
            'login': Login,
            'main-page': Main,
            'account-updation': AccountUpdation
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
