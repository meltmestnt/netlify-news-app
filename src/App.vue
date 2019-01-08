<template>
  <div id="app" :class="{app__dark: darken}" @click.stop="closeSettings($event)">
    <progress-bar/>
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
import ProgressBar from "./components/ProgressBar.vue"
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
      eventBus.$emit('closeSettings', e);
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
  transition: all .2s;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-leave, .fade-enter-to {
  opacity: 1;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
#app .main__container {
  margin-top: 60px;
}
</style>
