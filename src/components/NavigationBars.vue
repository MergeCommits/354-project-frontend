<template>
    <div>
        <!-- Top bar. -->
        <v-app-bar app clipped-left :color="PRIMARY_COLOR" class="animated fadeInRight">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-icon :color="ACCENT_COLOR" large style="margin-left: 10px">fas fa-meteor</v-icon>
        <span class="title ml-4 mr-3 font-weight-regular" style="color:white">The Stars</span>
        <v-divider color="white" style="max-width: 3%"></v-divider>
        <v-badge style="margin-top: 3px; margin-left: 15px"
                 v-if="render"
                 overlap
                 class="animated bounceIn"
                 :color="ACCENT_COLOR">
            <template v-slot:badge v-if="render && count > 0">
                <span>{{count}}</span>
            </template>
            <v-btn outlined color="white" router to="/cart">
                <v-icon style="font-size: 20px">fas fa-shopping-cart</v-icon>
                <span class="title font-weight-light"
                      style="font-size: 17px !important; margin-left: 5px; text-transform: none">Cart</span>
            </v-btn>
        </v-badge>
            <v-badge style="margin-top: 3px; margin-left: 15px"
                     v-if="!render"
                     overlap
                     class="animated bounceIn"
                     :color="ACCENT_COLOR">
                <template v-slot:badge>
                    <span>{{count}}</span>
                </template>
                <v-btn outlined color="white" @click="$router.push({ name: 'cart'})">
                    <v-icon style="font-size: 20px">fas fa-shopping-cart</v-icon>
                    <span class="title font-weight-light"
                          style="font-size: 17px !important; margin-left: 5px; text-transform: none">Cart</span>
                </v-btn>
            </v-badge>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
                :solo="isSearchActive"
                :solo-inverted="!isSearchActive"
                :color="PRIMARY_COLOR"
                style="margin-left: 20px; max-width: 20%;"
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
                offset-y
                transition="scale-transition">
            <template v-slot:activator="{ on }">
                <v-btn class="no-highlight" fab text v-on="on">
                    <v-icon color="white" style="font-size: 43px">account_circle</v-icon>
                </v-btn>
            </template>

            <v-list dense class="grey lighten-4" rounded min-width="200">
                <template v-if="!this.$store.state.isLoggedIn">
                    <v-list-item router :to="getLoginRouter()">
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
                            <span style="font-size: 1px; color: transparent">{{cartItemCount}}</span>
                            <v-icon>far fa-user-circle</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey--text">
                                Create an account
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <template v-else>
                    <!-- TODO: Link to user's profile. -->
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>fas fa-male</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey--text">
                                {{getUserData("username")}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item router :to="getLogoutRouter()">
                        <v-list-item-action>
                            <v-icon>fas fa-sign-in-alt</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey--text">
                                Logout
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-menu>
    </v-app-bar>

    <!-- Navigation bar. -->
    <v-navigation-drawer v-model="drawer" mini app clipped color="grey lighten-4">
        <v-list dense class="grey lighten-4" shaped>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                <v-list-item-action v-if="link.icon !== 'shopping_cart'">
                    <v-icon>{{link.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-action v-else>
                    <v-badge :color="ACCENT_COLOR">
                        <template v-slot:badge style="max-height: 10px!important;" v-if="count > 0">
                            <span>{{count}}</span>
                        </template>
                        <v-icon>shopping_cart</v-icon>
                    </v-badge>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="grey--text">{{link.text}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
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
            render: true,
            isSearchActive: false,
            search: null,
            count: null,
            links: [
                { icon: 'home', text: 'Dashboard', route: '/home' },
                {icon: 'shopping_cart', text: 'Shopping Cart', route: '/cart'},
                // TODO: Figure out wtf is the difference between these two.
                { icon: 'person', text: 'Manage account', route: '/settings' },
                { icon: 'settings', text: 'Settings', route: '/settings' },
            ]
        }),
        created: function () {
            let cart = localStorage.getItem("cart");
            if (!Utilities.isEmpty(cart)) {
                this.count = JSON.parse(cart).length;
            }
        },
        computed: {
            cartItemCount() {
                this.$root.$on('cartItemCount', (count) => {
                    this.count = JSON.parse(localStorage.getItem("cart")).length;
                    this.render = !this.render;
                });
                let cart = localStorage.getItem("cart");
                if (!Utilities.isEmpty(cart)) {
                    return JSON.parse(cart).length
                } else {
                    return 0;
                }
            }
        }
    }
</script>

<style scoped>
    .v-btn.no-highlight:focus::before {
        opacity: 0;
    }
</style>