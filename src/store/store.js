import Vuex from 'vuex';
import Vue from 'vue';
import {APICall, RequestType} from '../components/common/API'
import Requests from "../components/common/Requests";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selfCheckComplete: false,
        isLoggedIn: false,
        currUser: null,

        loadingShoppingCart: true,
        shoppingCart: null,

        categorySelected: null,
        inputItems: [],
        productsCount: null
    },

    actions: {
        async fetchProducts(context, queryString) {
            const response = await Requests.searchQueryAsync(queryString);
                if (!response.error) {
                    context.commit('setProducts', response.data["products"]);
                    context.commit('setProductsCount', response.data["count"]);
                }
        }
    },

    getters: {
        cartItemCount(state) {
            if (state.shoppingCart !== null) {
                return state.shoppingCart["lines"].length;
            }
            return 0;
        },

        getItems(state) {
            return state.inputItems;
        }
    },

    mutations: {
        login(state, userData) {
            state.isLoggedIn = true;
            state.currUser = userData;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currUser = null;
        },
        selfChecked(state) {
            state.selfCheckComplete = true;
        },

        setShoppingCart(state, cartData) {
            state.shoppingCart = cartData;
        },
        startCartLoad(state) {
            state.loadingShoppingCart = true;
        },
        stopCartLoad(state) {
            state.loadingShoppingCart = false;
        },

        setProducts(state, products) {
            state.inputItems.splice(0, state.inputItems.length)
            for(let product of products){
                state.inputItems.push(product)
            }
        },
        setProductsCount(state, productsCount) {
            state.productsCount = productsCount > -1 ? productsCount : 0
        },
        setCategories(state, categories) {
            state.categories.splice(0, state.categories.length);
            for(let category of categories){
                state.categories.push(category)
            }
        }
    }
});
