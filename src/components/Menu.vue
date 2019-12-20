
<template>
  <div
    class="menu__container"
    :class="{dark: darken}"
  >
    <div class="menu">
      <div
        class="burger"
        @click="showBurgerMenu = !showBurgerMenu"
        :class="{clicked: showBurgerMenu}"
      >
        <span :class="{after__span__delay: !showBurgerMenu}"></span>
        <span></span>
        <span :class="{after__span__delay: !showBurgerMenu}"></span>
        <div class="additional__line">

        </div>
      </div>
      <transition name="left">
        <div
          class="left__menu"
          v-if="showBurgerMenu"
          :class="{dark: darken}"
        >
          <ul>
            <li
              v-for="link in links"
              :id="link.title"
              :key="link.title"
              @click="circleShow($event)"
            >
              <Circlee
                :darken="darken"
                :delay="15"
              />
              <router-link
                :class="{active: link.active, active__dark: darken && link.active}"
                :to="{name:link.title}"
              >{{link.title}}</router-link>
            </li>
          </ul>
        </div>
      </transition>
      <ul class="hideUl">
        <li
          v-for="link in links"
          :id="link.title"
          :key="link.title"
          @click="circleShow($event)"
        >
          <Circlee
            :darken="darken"
            :delay="15"
          />
          <router-link
            :class="{active: link.active, active__dark: darken && link.active}"
            :to="{name:link.title}"
          >{{link.title}}</router-link>
        </li>
      </ul>
    </div>
    <div
      class="settings__button"
      :class="{settings__button__dark: darken}"
    >
      <Settings />
    </div>
  </div>
</template>

<script>
import Settings from "./Settings.vue";
import Circlee from "./Circlee.vue";
export default {
  name: "Menu",
  components: {
    Settings,
    Circlee
  },
  data() {
    return {
      showBurgerMenu: false,
      links: [
        {
          title: "home",
          active: true,
          show: false,
          clicked: false
        },
        {
          title: "search",
          active: false,
          show: false,
          clicked: false
        },
        {
          title: "about",
          active: false,
          show: false,
          clicked: false
        }
      ]
    };
  },
  created() {
    eventBus.$on("highlighte", syntax => {
      this.links.forEach(link => {
        link.active = false;
        if (link.title == syntax) {
          link.active = true;
        }
      });
    });
  },
  methods: {
    circleShow(e) {
      eventBus.$emit("circleshow", e, e.currentTarget);
    }
  },
  computed: {
    styleObj() {
      return {
        transform: `scale(${this.incrementing}, ${this.incrementing})`,
        left: `${this.left}px`,
        top: `${this.top}px`,
        opacity: 0.4
      };
    },
    darken() {
      return this.$store.getters.checkDark;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: "Oswald", sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: center;
}
.left-enter-active,
.left-leave-active {
  transition: 0.3s all cubic-bezier(0.694, 0.048, 0.335, 1);
}
.left-enter,
.left-leave-to {
  transform: translateX(-100%);
}
.left-enter-to,
.left-leave {
  transform: translateX(0);
}
.burger {
  width: 65px;
  height: 100%;
  display: flex;
  display: none;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.694, 0.048, 0.335, 1);
}
.burger span {
  display: block;
  width: 60%;
  height: 4px;
  background-color: lightgrey;
  border-radius: 50px;
  margin-top: 5px;
  cursor: pointer;
}
.burger span:first-child {
  margin: 0px;
  transform: scaleX(1);
  transition: transform 0.2s cubic-bezier(0.694, 0.048, 0.335, 1);
}
.after__span__delay {
  transition-delay: 0.4s !important;
}
.burger span:nth-child(3) {
  width: 40%;
  transform: translateX(-25%);
  transition: 0.2s width cubic-bezier(0.694, 0.048, 0.335, 1);
}
.additional__line {
  width: 4px;
  position: absolute;
  height: 0;
  top: 20%;
  background-color: lightgrey;
  left: 50%;
  transform: translateX(-50%);
  transition: height 0.4s cubic-bezier(0.694, 0.048, 0.335, 1);
}
.clicked {
  transform: rotate(45deg);
  transition-delay: 0.4s;
}
.clicked span:first-child {
  transform: scaleX(0);
  transition: transform 0.2s cubic-bezier(0.694, 0.048, 0.335, 1);
}
.clicked span:nth-child(3) {
  width: 0;
  transition: width 0.2s cubic-bezier(0.694, 0.048, 0.335, 1);
}
.clicked .additional__line {
  transition-delay: 0.3s !important;
  height: 60%;
  transition: height 0.2s cubic-bezier(0.694, 0.048, 0.335, 1);
}
.dark {
  background: #1b1b1b !important;
  box-shadow: none !important;
}
.active {
  color: white !important;
  background-color: #f60;
}
.active__dark {
  background-color: #007aff !important;
}
.circle__dark {
  background-color: #007aff !important;
}
.menu__container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  z-index: 999;
  background: white;
}
.menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.menu ul {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}
.menu li {
  list-style: none;
  text-transform: uppercase;
  cursor: pointer;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.menu .circle {
  position: absolute;
  background-color: #f60;
  border-radius: 200px;
  width: 8px;
  height: 8px;
}
.menu li a {
  text-decoration: none;
  color: rgba(95, 111, 129, 1);
  width: 100%;
  height: 100%;
  padding: 25px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 2px;
  position: relative;
  font-size: 1rem !important;
  z-index: 999;
  transition: 0.2s;
}
.left__menu {
  height: calc(100vh - 60px);
  background-color: white;
  box-shadow: 3px 0px 35px 8px rgba(211,211,211,0.8);
  position: absolute;
  top: 100%;
  left: 0;
  width: 50%;
}
.left__menu ul {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
}

.left__menu li {
  width: 100%;
  height: 50px;
}
</style>
