import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import Register from './views/AccountCreation'
import Home from './views/Home'
import Search from './views/Search'
import Settings from "./views/AccountUpdation"
import Cart from "./views/Cart"

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            // Redirect homebase to login page as per requirements.
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/search',
            name: 'search',
            component: Search,
            props: true
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        }

    ]
})
