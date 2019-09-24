<template>
    <v-app id="keep">
        <v-app-bar
                app
                clipped-left
                color="orange lighten-1">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <span class="title ml-3 mr-5">The Stars&nbsp;<span class="font-weight-light">354</span></span>
            <v-icon large style="margin-right: 10px">blur_on</v-icon>
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
                        <v-icon large>account_circle</v-icon>
                    </v-btn>
                </template>

                <v-list dense class="grey lighten-4" rounded min-width="200">
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
            <v-container fluid class="grey lighten-4 fill-height">
                <v-layout justify-center pt-5>
                    <v-card height="70%" width="70%" rounded>
                        <v-container>
                            <v-row style="width: 100%">
                                <v-col>
                                    <v-row style="padding-top: 5%; padding-left: 10%">
                                        <span style="font-size: 30px" class="font-weight-regular">The Stars</span>
                                    </v-row>
                                    <v-row style="padding-top: 1%; padding-left: 10%">
                                        <span style="font-size: 20px" class="font-weight-light">Create your Star account</span>
                                    </v-row>
                                    <v-row style="margin-right: 5%; margin-left: 5%">
                                        <v-col>
                                            <v-text-field outlined label="First name" ></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field outlined label="Last name"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -5%">
                                    <v-col>
                                        <v-text-field outlined label="Email"></v-text-field>
                                    </v-col>
                                </v-row>
                                    <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -5%">
                                        <v-col>
                                            <v-text-field outlined label="Password"
                                                          append-icon="lock"
                                                            type="password"
                                                            style="margin-bottom: -5%">
                                            </v-text-field>
                                            <span style="font-size: 13px;margin-left: 1%" class="font-weight-light">
                                            You must use height characters with letters, numbers and symbols
                                            </span>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-layout justify-end style="margin-right: 7%">
                                            <v-btn style="margin-right: 5%">Cancel</v-btn>
                                            <v-btn color="grey darken-3" dark>Create</v-btn>
                                            </v-layout>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col class="fill-height">
                                    <v-row>
                                        <v-layout style="margin-top: 10%" pt-5 justify-center>
                                        <v-icon style="font-size: 250px" color="orange lighten-1">blur_on</v-icon>
                                        </v-layout>
                                    </v-row>
                                    <v-row>
                                        <v-layout pt-4 justify-center>
                                            <span style="font-size: 20px" class="font-weight-light">
                                                Everything you can imagine.
                                            </span>
                                        </v-layout>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
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
