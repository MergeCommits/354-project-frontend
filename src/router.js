import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login';
import Logout from "./views/Logout";
import Register from './views/AccountCreation';
import Home from './views/Home';
import Search from './views/Search';
import Settings from "./views/AccountUpdation";
import Cart from "./views/Cart";
import Product from "./views/Product";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            // Redirect index page to login page as per requirements.
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            meta: { hideNavigation: true },
            component: Login
        },
        {
            path: '/logout',
            name: 'logout',
            meta: { hideNavigation: true },
            component: Logout
        },
        {
            path: '/register',
            name: 'register',
            meta: { hideNavigation: true },
            component: Register
        },
        {
            path: '/home',
            name: 'home',
            meta: { hideNavigation: false },
            component: Home,
        },
        {
            path: '/product/:id',
            name: 'product',
            component: Product,
            meta: { hideNavigation: false },
        },
        {
            path: '/search',
            name: 'search',
            meta: { hideNavigation: false },
            component: Search,
            props: true
        },
        {
            path: '/settings',
            name: 'settings',
            meta: { hideNavigation: false },
            component: Settings
        },
        {
            path: '/cart',
            name: 'cart',
            meta: { hideNavigation: false },
            component: Cart
        }

    ]
})
