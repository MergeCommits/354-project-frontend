import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login";
import Logout from "./views/Logout";
import Register from "./views/AccountCreation";
import Home from "./views/Home";
import Search from "./views/Search";
import Settings from "./views/AccountUpdation";
import Cart from "./views/Cart";
import Product from "./views/Product";
import ProductCreation from "./views/ProductCreation";
import Checkout from "./views/Checkout";

Vue.use(Router);

let router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            // Redirect index page to login page as per requirements.
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                hideNavigation: true,
                loginRequired: false,
                logoutRequired: true
            }
        },
        {
            path: "/logout",
            name: "logout",
            component: Logout,
            meta: {
                hideNavigation: true,
                loginRequired: false,
                logoutRequired: false
            }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                hideNavigation: true,
                loginRequired: false,
                logoutRequired: true
            }
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                hideNavigation: false,
                loginRequired: false,
                logoutRequired: false
            }
        },
        {
            path: "/:categoryPermalink/:productPermalink",
            name: "product",
            component: Product,
            meta: {
                hideNavigation: false,
                loginRequired: false,
                logoutRequired: false
            },
            props: true
        },
        {
            path: "/add-product",
            name: "add-product",
            component: ProductCreation,
            meta: {
                hideNavigation: true,
                loginRequired: true,
                logoutRequired: false
            }
        },
        {
            path: "/search",
            name: "search",
            component: Search,
            props: true,
            meta: {
                hideNavigation: false,
                loginRequired: false,
                logoutRequired: false
            }
        },
        {
            path: "/settings",
            name: "settings",
            component: Settings,
            meta: {
                hideNavigation: false,
                loginRequired: true,
                logoutRequired: false
            }
        },
        {
            path: "/cart",
            name: "cart",
            component: Cart,
            meta: {
                hideNavigation: false,
                loginRequired: false,
                logoutRequired: false
            }
        },
        {
            path: "/checkout",
            name: "checkout",
            component: Checkout,
            meta: {
                hideNavigation: false,
                loginRequired: true,
                logoutRequired: false
            }
        }

    ]
});

router.beforeEach((to, from, next) => {
    to.meta.prevRoute = from;
    next();
});

export default router;