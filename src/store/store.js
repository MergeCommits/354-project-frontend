import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categorySelected: null,
    inputItems: [
      {
        price: 325,
        name: "Cars",
        imageUrl: "https://picsum.photos/id/1013/500",
        title:
            'Tufoil Lubit 8 Lubit-8 with PTFE - "It takes few drops" Oil Lock Pen Stylo'
      },
      {
        price: 3,
        name: "Sports",
        imageUrl: "https://picsum.photos/id/1016/500",
        title:
            "Few Days Left - Scorpio The Man Myth Legend Gildan Hoodie Sweatshirt"
      },
      {
        price: 435,
        name: "Kitchen",
        imageUrl: "https://picsum.photos/id/1055/500",
        title: "Come Back in a Few Beers Patch Beer Iron to Sew on Patch Badge"
      },
      {
        price: 354,
        name: "Drugs",
        imageUrl: "https://picsum.photos/id/1024/500",
        title: "Dior J’Adore - Eau de Perfume 50ml - Used only a few"
      },
      {
        price: 99,
        name: "House",
        imageUrl: "https://picsum.photos/id/1029/500",
        title: "Antminer A3 Very few hours used."
      },
      {
        price: 27,
        name: "Footwear",
        imageUrl: "https://picsum.photos/id/103/500",
        title: "HE IS LEGEND-FEW (UK IMPORT) VINYL LP NEW"
      },
      {
        price: 12,
        name: "Food",
        imageUrl: "https://picsum.photos/id/1033/500",
        title: "For a Few Dollars More (DVD, 1998, Western Legends) GOOD"
      },
      {
        price: 2344,
        name: "Electronics",
        imageUrl: "https://picsum.photos/id/1038/500",
        title: "ROGER FIDO CANADA IPHONE ULOCK INSTANT TO FEW HRS"
      },
      {
        price: 101,
        name: "Clothing",
        imageUrl: "https://picsum.photos/id/1026/500",
        title: "1951 $1.00 MS-63 FEW TONED"
      }
    ],
    productCategories0: [
      {
        categoryLabel: "Cars",
        imageUrl: "https://picsum.photos/id/1013/500",
        productCategories1: [
          {
            categoryLabel: "test1",
            imageUrl: "https://picsum.photos/id/1013/500"
          },
          {
            categoryLabel: "test2",
            imageUrl: "https://picsum.photos/id/1013/500"
          }
        ]
      }
    ]
  },

  getters: {
    // categorySet :
    getProductCategories1: (category1State) => {
      return this.state.productCategories0.filter(
          obj => obj.categoryLabel === category1State
      ).productCategories1;
    }
  },

  mutations: {},

  actions: {}
});
