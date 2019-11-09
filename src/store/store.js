import Vuex from 'vuex';
import Vue from 'vue';
import {APICall, RequestType} from '../components/common/API'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selfCheckComplete: false,
        isLoggedIn: false,
        currUser: null,
        categorySelected: null,
        inputItems: [],
        productsCount: 0
    },

    actions: {
        fetchProducts(context,queryString) {
            const FOUND = 200;
            let searchQuery = new APICall(RequestType.GET, 'products' + queryString, null, [FOUND]);
            searchQuery.performRequest()
                .then(response => {
                    switch (response.status) {
                        case FOUND: {
                            context.commit('setProducts', response.data.products)
                            context.commit('setProductsCount', response.data.count)
                        } break;
                    }
                });      
        }
    },

    getters: { 
        getItems(state) {
            return state.inputItems
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
        setProducts(state, products) {
            state.inputItems.splice(0, state.inputItems.length)
            for(let product of products){
                state.inputItems.push(product)
            }
        },
        setProductsCount(state, productsCount) {
            if (productsCount > -1) {
                state.productsCount = productsCount
            } else {
                state.productsCount = 0
            }
        },
        setCategories(state, categories) {
            state.categories.splice(0, state.categories.length)
            for(let category of categories){
                state.categories.push(category)
            }
        }
    }
});
