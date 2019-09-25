<template>
    <v-app id="keep">
        <v-app-bar
                app
                clipped-left
                color="blue lighten-3">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <span class="title ml-3 mr-5" style="color:white">The Stars&nbsp;<span class="font-weight-light">354</span></span>
            <v-icon color="orange lighten-1" large style="margin-right: 10px">blur_on</v-icon>
            <v-text-field
                    solo-inverted
                    color="white"
                    flat
                    rounded
                    hide-details
                    label="Search"
                    prepend-inner-icon="search"
            ></v-text-field>
            <div class="flex-grow-1"></div>
            <v-menu bottom
                    open-on-hover
                    origin="center center"
                    transition="scale-transition">
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" fab text>
                        <v-icon large >account_circle</v-icon>
                    </v-btn>
                </template>

                <v-list dense class="grey lighten-4" rounded min-width="200">
                    <v-list-item @click="">
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

        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
                color="grey lighten-4">
            <v-list dense class="grey lighten-4" shaped>
                <template v-for="(item, i) in items">
                    <v-row
                            v-if="item.heading"
                            :key="i"
                            align="center">
                        <v-col cols="6">
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-col>
                    </v-row>
                    <v-divider
                            v-else-if="item.divider"
                            dark
                            class="my-4"></v-divider>
                    <v-list-item
                            v-else
                            :key="i"
                            @click="">
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey--text">
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <v-dialog v-model="wantsToCreateAccount" fullscreen>
            <account-creation v-on:goToMain="wantsToCreateAccount = false" v-if="wantsToCreateAccount"></account-creation>
            </v-dialog>
        </v-content>
    </v-app>
</template>

<script>
    import AccountCreation from "./components/AccountCreation"

    export default {
        props: {
            source: String,
        },
        components: {
            'account-creation': AccountCreation
        },
        data: () => ({
            wantsToCreateAccount: false,
            drawer: null,
            items: [
                {icon: 'lightbulb_outline', text: 'Layout'},
                {icon: 'touch_app', text: 'Layout'},
                {divider: true},
                {heading: 'Layout'},
                {icon: 'add', text: 'Layout'},
                {divider: true},
                {icon: 'archive', text: 'Layout'},
                {icon: 'delete', text: 'Layout'},
                {divider: true},
                {icon: 'settings', text: 'Layout'},

            ],
        }),
    };
</script>
