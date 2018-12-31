import Vue from "vue";
import Router from "vue-router";
import Home from "./../components/Home.vue";
import Search from "./../components/Search.vue";
import About from "./../components/About.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  fallback: false,
  routes: [
    {
      path: "/",
      component: Home,
      name: "home",
      props: { syntax: "home" }
    },
    {
      path: "/search",
      component: Search,
      name: "search",
      props: { syntax: "search" }
    },
    {
      path: "/about",
      component: About,
      name: "about",
      props: { syntax: "about" }
    }
  ]
});

export default router;
