<template>
    <v-layout justify-center fill-height pt-5 wrap style="min-width: 110%; margin-left: -3%">
        <v-card height="500px" width="1000px" flat outlined style="padding-left: 20px; padding-right: 20px; border-radius: 10px">
            <v-container fluid>
                <v-row>
                    <v-col style="max-width: 300px!important;">
                        <v-layout style="border-right: solid grey 1px;">
                            <v-list>
                                <span class="title font-weight-medium" style="color:#616161">Account settings</span>
                                <v-list-item v-for="link in links" :key="link.text" @click="menuPosition = link.strVal"
                                             v-bind:class="{ activeListItem: isMenuComponentActive(link.strVal) }">
                                    <v-list-item-action>
                                        <v-icon>{{link.icon}}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{link.text}}
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
    import Utilities from "../components/common/Utilities"

    export default {
        name: "AccountUpdation",
        mixins:[Utilities],
        data: () => ({
            menuPosition: 'editProfile',
            links: [
                { icon: 'edit', text: 'Edit profile', strVal: 'editProfile' },
                { icon: 'far fa-user-circle', text: 'Manage password', strVal: 'managePassword' },
                { icon: 'security', text: 'Security', strVal: 'security' },
                { icon: 'info', text: 'About', strVal: 'about' }
            ]
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
