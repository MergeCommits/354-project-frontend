<template>
<v-navigation-drawer mini app clipped color="grey lighten-4"
                     v-bind:value="value"
                     v-on:input="$emit('input', $event)">
    <v-list dense class="grey lighten-4" shaped>
        <v-list-item @click="">
            <v-list-item-action>
                <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="grey--text">
                    Home
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
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
</template>

<script>
// import Component from 'vue-class-component'

// @Component
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            links: [
                { icon: 'dashboard', text: 'Dashboard', route: '/' },
                { icon: 'folder', text: 'My Projects', route: '/projects' },
                { icon: 'person', text: 'Team', route: '/team' },
            ]
        }
    }
}
</script>

<style scoped>

</style>