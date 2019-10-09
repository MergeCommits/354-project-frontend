<template>
    <v-app id="inspire">
        <v-app-bar
                app
                clipped-left
                :color="PRIMARY_COLOR">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-icon :color="ACCENT_COLOR" large style="margin-left: 10px">fas fa-meteor</v-icon>
            <span class="title ml-4 mr-3 font-weight-regular" style="color:white">The Stars</span>
            <v-text-field
                    :solo="isSearchActive"
                    :solo-inverted="!isSearchActive"
                    :color="PRIMARY_COLOR"
                    style="margin-left: 20px"
                    :flat="!isSearchActive"
                    v-model="search"
                    rounded
                    hide-details
                    label="Search"
                    @focus="isSearchActive = true"
                    @blur="isSearchActive = false"
                    prepend-inner-icon="search">
            </v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-menu bottom
                    origin="center center"
                    transition="scale-transition">
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" fab text>
                        <v-icon color="white" large>account_circle</v-icon>
                    </v-btn>
                </template>

                <v-list dense class="grey lighten-4" rounded min-width="200">
                    <v-list-item @click="wantsToLogin = true">
                        <v-list-item-action>
                            <v-icon>fas fa-sign-in-alt</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey--text">
                                Login
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="wantsToCreateAccount = true">
                        <v-list-item-action>
                            <v-icon>far fa-user-circle</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey--text">
                                Create an account
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" mini app clipped color="grey lighten-4">
            <v-list dense class="grey lighten-4" shaped>
                <v-list-item @click="menuPosition='main'">
                    <v-list-item-action>
                        <v-icon>home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text">
                            Home
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="menuPosition='accountUpdation'">
                    <v-list-item-action>
                        <v-icon>person</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text">
                            Manage account
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item @click="">
                    <v-list-item-action>
                        <v-icon>settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text">
                            Settings
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content>

            <main-page :search="search" v-if="menuPosition === 'main'"></main-page>

            <account-updation v-if="menuPosition === 'accountUpdation'"></account-updation>

            <v-dialog v-model="wantsToCreateAccount" fullscreen>
                <account-creation v-on:goToMain="wantsToCreateAccount = false"
                                  v-if="wantsToCreateAccount"></account-creation>
            </v-dialog>
            <v-dialog v-model="wantsToLogin" fullscreen>
                <login v-if="wantsToLogin" v-on:goToMain="wantsToLogin = false"
                        v-on:goToFormCreation="wantsToCreateAccount=true; wantsToLogin=false;">
                </login>
            </v-dialog>

        </v-content>
    </v-app>
</template>

<script>
    import AccountCreation from "./components/AccountCreation"
    import Login from "./components/Login"
    import Main from "./components/Main"
    import Utilities from "./components/common/Utilities"
    import AccountUpdation from "./components/AccountUpdation"

    export default {
        mixins: [Utilities],
        components: {
            'account-creation': AccountCreation,
            'login': Login,
            'main-page': Main,
            'account-updation': AccountUpdation
        },
        data: () => ({
            wantsToCreateAccount: false,
            wantsToLogin: true,
            menuPosition: 'main',
            isSearchActive: false,
            drawer: false,
            search: null
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
