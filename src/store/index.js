import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);
const url =
  "https://newsapi.org/v2/everything?q=russia&sortBy=publishedAt&apiKey=7de3320596824022aae7ab4bf76c7be6";
const store = {
    state: {
        newsObject: [],
        dark: false
    },
    mutations: {
        darken(state) {
            state.dark = !state.dark;
        }
    },
    actions: {
        grabData(context) {
            axios.get(url)
            .then((response) => {
                context.state.newsObject = [...response.data.articles];
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
    getters: {
        getArticles(state) {
            return state.newsObject;
        },
        checkDark(state) {
            return state.dark;
        }
    }
}

export default new Vuex.Store(store);