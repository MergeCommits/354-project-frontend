<template>
    <v-layout justify-center fill-height pt-5 wrap style="min-width: 110%; margin-left: -3%">
        <v-card height="500px" width="1000px" flat outlined style="padding-left: 20px; padding-right: 20px; border-radius: 10px">
            <v-container fluid>
                <v-row>
                    <v-col style="max-width: 300px!important;">
                        <v-layout style="border-right: solid grey 1px;">
                            <v-list>
                                <span class="title font-weight-medium" style="color:#616161">Account settings</span>
                                <v-list-item @click="menuPosition = 'editProfile'" style="margin-top: 10px;"
                                             v-bind:class="{ activeListItem: isMenuComponentActive('editProfile') }">
                                    <v-list-item-action>
                                        <v-icon>edit</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Edit profile
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="menuPosition = 'managePassword'"
                                             v-bind:class="{ activeListItem: isMenuComponentActive('managePassword') }">
                                    <v-list-item-action>
                                        <v-icon>far fa-user-circle</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Manage password
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="menuPosition = 'security'"
                                             v-bind:class="{ activeListItem: isMenuComponentActive('security') }">
                                    <v-list-item-action>
                                        <v-icon>security</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Security
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="menuPosition = 'about'"
                                             v-bind:class="{ activeListItem: isMenuComponentActive('about') }">
                                    <v-list-item-action>
                                        <v-icon>info</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            About
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-layout>
                    </v-col>
                    <v-col>
                        <v-layout justify-center>
                            <span>Profile</span>
                        </v-layout>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-layout>
</template>

<script>
    import Utilities from "./common/Utilities"

    export default {
        name: "AccountUpdation",
        mixins:[Utilities],
        data: () => ({
            menuPosition: 'editProfile'
        }),
        methods: {
            isMenuComponentActive(position){
                return this.menuPosition === position;
            }
        }
    }
</script>

<style>
    .activeListItem {
        border-left: solid #FF8F00;
    }

    .activeListItem .v-list-item__title, .activeListItem .v-list-item__action .v-icon {
        color: #FF8F00;
    }
</style>
