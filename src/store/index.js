import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
let url =
  "https://newsapi.org/v2/top-headlines?country=us&sortBy=publishedAt&apiKey=7de3320596824022aae7ab4bf76c7be6";
const store = {
  state: {
    newsObject: [],
    dark: false,
    lastDataSearchArt: [],
    keyword: '',
    country: 'us'
  },
  mutations: {
    darken(state) {
      state.dark = !state.dark;
    },
    clearArticles(state) {
      state.newsObject = [];
    },
    saveLastDataSearch(state) {
      state.lastDataSearchArt = [...state.newsObject];
    },
    clearLastDataSearch(state) {
      state.lastDataSearchArt = [];
    },
    changeCountry(state, payload) {
      state.country = payload;
    }
  },
  actions: {
    grabData(context, payload) {
      return new Promise((resolve, reject) => {
        if (payload) {
          context.state.keyword = payload;
          url = `https://newsapi.org/v2/everything?q='+${payload}'&language=en&sortBy=publishedAt&apiKey=7de3320596824022aae7ab4bf76c7be6`;
        } else {
          url =
            `https://newsapi.org/v2/top-headlines?country=${context.state.country}&sortBy=publishedAt&apiKey=7de3320596824022aae7ab4bf76c7be6`;
        }
        axios
          .get(url)
          .then(response => {
            context.state.newsObject = [...response.data.articles];
            resolve();
          })
          .catch(error => {
            console.log(error);
            reject();
          });
      })
    
    }
  },
  getters: {
    getArticles(state) {
      return state.newsObject;
    },
    checkDark(state) {
      return state.dark;
    },
    lastDataSearch(state) {
      return state.lastDataSearchArt;
    },
    keyword(state) {
      return state.keyword;
    },
    getCountry(state)  {
      return state.country;
    }
  }
};

export default new Vuex.Store(store);
