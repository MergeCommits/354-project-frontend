import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login'
import Home from './components/Main'

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
            path: '/home',
            name: 'home',
            component: Home
        }

    ]
})