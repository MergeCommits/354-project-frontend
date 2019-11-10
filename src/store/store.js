import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        selfCheckComplete: false,
        isLoggedIn: false,
        currUser: null,

        loadingShoppingCart: true,
        shoppingCart: null,

        categorySelected: null,
        inputItems: [
            {
                price: 325,
                name: 'Cars',
                imageUrl: 'https://picsum.photos/id/1013/500',
                title: 'Tufoil Lubit 8 Lubit-8 with PTFE - "It takes few drops" Oil Lock Pen Stylo',
                id: 1
            },
            {
                price: 3,
                name: 'Sports',
                imageUrl: 'https://picsum.photos/id/1016/500',
                title: 'Few Days Left - Scorpio The Man Myth Legend Gildan Hoodie Sweatshirt',
                id: 2
            },
            {
                price: 435,
                name: 'Kitchen',
                imageUrl: 'https://picsum.photos/id/1055/500',
                title: 'Come Back in a Few Beers Patch Beer Iron to Sew on Patch Badge',
                id: 3
            },
            {
                price: 354,
                name: 'Drugs',
                imageUrl: 'https://picsum.photos/id/1024/500',
                title: 'Dior J’Adore - Eau de Perfume 50ml - Used only a few',
                id: 4
            },
            {
                price: 99,
                name: 'House',
                imageUrl: 'https://picsum.photos/id/1029/500',
                title: 'Antminer A3 Very few hours used.',
                id: 5
            },
            {
                price: 27,
                name: 'Footwear',
                imageUrl: 'https://picsum.photos/id/103/500',
                title: 'HE IS LEGEND-FEW (UK IMPORT) VINYL LP NEW',
                id: 6
            },
            {
                price: 12,
                name: 'Food',
                imageUrl: 'https://picsum.photos/id/1033/500',
                title: 'For a Few Dollars More (DVD, 1998, Western Legends) GOOD',
                id: 7
            },
            {
                price: 2344,
                name: 'Electronics',
                imageUrl: 'https://picsum.photos/id/1038/500',
                title: 'ROGER FIDO CANADA IPHONE ULOCK INSTANT TO FEW HRS',
                id: 8
            },
            {
                price: 101,
                name: 'Clothing',
                imageUrl: 'https://picsum.photos/id/1026/500',
                title: '1951 $1.00 MS-63 FEW TONED',
                id: 9
            }
        ]
    },

    getters: {
        cartItemCount(state) {
            if (state.shoppingCart !== null) {
                return state.shoppingCart["lines"].length;
            }
            return 0;
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
        }
    }
});
