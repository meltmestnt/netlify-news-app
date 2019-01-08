
<template>
  <div
    class="menu__container"
    :class="{dark: darken}"
  >
    <div class="menu">
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
.dark {
  background: #1b1b1b !important;
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
  justify-content: flex-end;
  z-index: 999;
  background: white;
}
.menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
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
  margin-left: 10px;
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
  padding: 30px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 2px;
  position: relative;
  z-index: 999;
  transition: 0.2s;
}
</style>
