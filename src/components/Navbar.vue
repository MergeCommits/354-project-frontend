<template>
<v-navigation-drawer mini app clipped color="grey lighten-4"
                     v-bind:value="value"
                     v-on:input="$emit('input', $event)">
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
                { icon: 'home', text: 'Dashboard', route: '/home' },
                // TODO: Figure out wtf is the difference between these two.
                { icon: 'person', text: 'Manage account', route: '/account' },
                { icon: 'settings', text: 'Settings', route: '/settings' },
            ]
        }
    }
}
</script>

<style scoped>

</style>