<template>
    <v-layout justify-center fill-height pt-5 wrap style="min-width: 110%; margin-left: -3%">
        <v-card height="500px" width="1000px" flat outlined style="padding-left: 20px; padding-right: 20px; border-radius: 10px">
            <v-container fluid>
                <v-row>
                    <v-col style="max-width: 300px!important;">
                        <v-layout style="border-right: solid grey 1px;">
                            <v-list>
                                <span class="title font-weight-medium" style="color:#616161">Account settings</span>
                                <v-list-item @click="" style="margin-top: 10px; border-left: solid #FF8F00">
                                    <v-list-item-action>
                                        <v-icon>edit</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title class="grey--text">
                                            Edit profile
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="">
                                    <v-list-item-action>
                                        <v-icon>far fa-user-circle</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title class="grey--text">
                                            Manage password
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="">
                                    <v-list-item-action>
                                        <v-icon>security</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title class="grey--text">
                                            Security
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item @click="">
                                    <v-list-item-action>
                                        <v-icon>info</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title class="grey--text">
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
    export default {
        name: "AccountUpdation"
    }
</script>

<style scoped>

</style>
