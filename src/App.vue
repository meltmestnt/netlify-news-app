<template>
  <div id="app">
    <progress-bar/>
    <Menu></Menu>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import ProgressBar from "./components/ProgressBar.vue"
export default {
  name: "app",
  components: {
    Menu,
    ProgressBar
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Oswald|Playfair+Display|Thasadith");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
* {
    font-family: "Thasadith", sans-serif;
    color: black;
}
#app {
  background-color: rgba(95, 111, 129, 0.1);
      overflow-x: hidden;
}
.main__content {
  width: 75%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background-color: white;
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
.fade-enter-active, .fade-leave-active {
  transition: all 0.2s;
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
