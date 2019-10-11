<template>
    <div>
    <!-- Top bar. -->
    <v-app-bar app clipped-left :color="PRIMARY_COLOR">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-icon :color="ACCENT_COLOR" large style="margin-left: 10px">fas fa-meteor</v-icon>
        <span class="title ml-4 mr-3 font-weight-regular" style="color:white">The Stars</span>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
                :solo="isSearchActive"
                :solo-inverted="!isSearchActive"
                :color="PRIMARY_COLOR"
                style="margin-left: 20px; max-width:20% !important;"
                :flat="!isSearchActive"
                v-model="search"
                rounded
                dense
                clearable
                hide-details
                label="Search"
                @focus="isSearchActive = true"
                @blur="isSearchActive = false"
                prepend-inner-icon="search">
        </v-text-field>
        <v-menu bottom
                origin="center center"
                transition="scale-transition">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab text>
                    <v-icon color="white" style="font-size: 43px!important;">account_circle</v-icon>
                </v-btn>
            </template>

            <v-list dense class="grey lighten-4" rounded min-width="200">
                <v-list-item router to="/login">
                    <v-list-item-action>
                        <v-icon>fas fa-sign-in-alt</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text">
                            Login
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item router to="/register">
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

    <!-- Navigation bar. -->
    <v-navigation-drawer v-model="drawer" mini app clipped color="grey lighten-4">
        <v-list dense class="grey lighten-4" shaped>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                <v-list-item-action>
                    <v-icon>{{link.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="grey--text">{{link.text}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <!--        <v-list-item @click="">-->
            <!--            <v-list-item-action>-->
            <!--                <v-icon>home</v-icon>-->
            <!--            </v-list-item-action>-->
            <!--            <v-list-item-content>-->
            <!--                <v-list-item-title class="grey&#45;&#45;text">-->
            <!--                    Home-->
            <!--                </v-list-item-title>-->
            <!--            </v-list-item-content>-->
            <!--        </v-list-item>-->
            <!--        <v-list-item @click="">-->
            <!--            <v-list-item-action>-->
            <!--                <v-icon>person</v-icon>-->
            <!--            </v-list-item-action>-->
            <!--            <v-list-item-content>-->
            <!--                <v-list-item-title class="grey&#45;&#45;text">-->
            <!--                    Manage account-->
            <!--                </v-list-item-title>-->
            <!--            </v-list-item-content>-->
            <!--        </v-list-item>-->
            <!--        <v-divider></v-divider>-->
            <!--        <v-list-item @click="">-->
            <!--            <v-list-item-action>-->
            <!--                <v-icon>settings</v-icon>-->
            <!--            </v-list-item-action>-->
            <!--            <v-list-item-content>-->
            <!--                <v-list-item-title class="grey&#45;&#45;text">-->
            <!--                    Settings-->
            <!--                </v-list-item-title>-->
            <!--            </v-list-item-content>-->
            <!--        </v-list-item>-->
        </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
    import Utilities from "./common/Utilities";

    export default {
        mixins: [Utilities],
        data: () => ({
            drawer: false,
            isSearchActive: false,
            search: null,
            links: [
                { icon: 'home', text: 'Dashboard', route: '/home' },
                // TODO: Figure out wtf is the difference between these two.
                { icon: 'person', text: 'Manage account', route: '/account' },
                { icon: 'settings', text: 'Settings', route: '/settings' },
            ]
        })
    }
</script>

<style scoped>

</style>