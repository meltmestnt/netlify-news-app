<template>
  <div
    id="app"
    :class="{app__dark: darken}"
    @click.stop="closeSettings($event)"
  >
    <progress-bar />
    <Menu></Menu>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view :class="{main__content__dark: darken}"></router-view>
    </transition>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import ProgressBar from "./components/ProgressBar.vue";
export default {
  name: "app",
  inheritAttrs: false,
  components: {
    Menu,
    ProgressBar
  },
  computed: {
    darken() {
      return this.$store.getters.checkDark;
    }
  },
  methods: {
    closeSettings(e) {
      eventBus.$emit("closeSettings", e);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Oswald|Playfair+Display|Thasadith|Roboto");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  background-color: rgba(95, 111, 129, 0.1);
  overflow-x: hidden;
}
.app__dark {
  background-color: #212121 !important;
}
.main__content {
  width: 75%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  color: black;
}
.main__content__dark {
  background-color: #212121 !important;
  color: white !important;
}

.main__container {
  width: 100vw;
  margin: 0 auto;
  font-size: 1.3rem;
  font-weight: normal;
  padding-top: 50px;
  min-height: 100vh;
  padding-bottom: 50px;
}
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
#app .main__container {
  margin-top: 60px;
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .menu li a {
    padding: 20px !important;
  }
  .burger {
    display: flex !important;
  }
  .menu .hideUl {
    display: none !important;
  }
  .main__content {
    width: 100%;
  }
  .article {
    height: 250px !important;
  }
  .article > a {
    width: 100% !important;
    top: 0;
    left: 0;
    height: 100% !important;
    max-width: 100% !important;
    position: absolute !important;
    z-index: 0;
    opacity: 0.2;
  }
  .additional__info {
    flex-direction: column !important;
  }
  .article .info {
    z-index: 99 !important;
  }
  .article img {
    height: 100% !important;
    width: 100% !important;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 992px) {
  .article {
    height: 250px !important;
  }
  .article > a {
    width: 100% !important;
    top: 0;
    left: 0;
    height: 100% !important;
    max-width: 100% !important;
    position: absolute !important;
    z-index: 0;
    font-size: 2rem !important;
    opacity: 0.2;
  }
  .info > p {
    font-size: 1.1rem !important;
  }
  .info > a {
    font-size: 1.2rem !important;
  }
  .additional__info {
    flex-direction: column !important;
  }
  .article .info {
    z-index: 99 !important;
  }
  .article img {
    height: 100% !important;
    width: 100% !important;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
}
</style>
