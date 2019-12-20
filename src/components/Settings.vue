<template>
  <div class="settings__container">
    <div
      class="setting__button"
      :class="{setting__button__dark: checkDark}"
      @click="showed()"
    >
      Settings
      <font-awesome-icon icon="cog" />
    </div>
    <transition name="fade__top">

      <div
        class="settings"
        v-show="show"
        :class="{settings__dark: checkDark}"
      >
        <div class="slider__container">
          <p>Enable dark theme</p>
          <label class="switch">
            <input
              type="checkbox"
              @change="darken()"
            >
            <span class="slider round"></span>
          </label>
        </div>
        <div class="country__container">
          <div
            @click="openSelect(), showCircle($event)"
            class="select"
            :class="{select__dark: checkDark}"
          >
            <Circlee :darken="checkDark" />
            {{$store.getters.getCountry.toUpperCase()}}
            <span :class="[selected ? 'selected' : 'not__selected']"></span>
          </div>
          <transition name="fade">
            <ul
              class="options"
              v-if="selected"
              :class="{options__dark: checkDark}"
            >
              <li
                class="option"
                @click="changeCountry(country), closeSelect()"
                v-for="country in lang"
                :key="country.country"
                :class="{active: country.active}"
              >
                {{country.country}}
              </li>
            </ul>
          </transition>

        </div>
      </div>

    </transition>
  </div>
</template>

<script>
import Circlee from "./Circlee.vue";
export default {
  name: "Settings",
  components: {
    Circlee
  },
  data() {
    return {
      show: false,
      selected: false,
      lang: [
        {
          country: "RU",
          active: false
        },
        {
          country: "US",
          active: true
        },
        {
          country: "PL",
          active: false
        },
        {
          country: "UA",
          active: false
        }
      ]
    };
  },
  methods: {
    darken() {
      this.$store.commit("darken");
    },
    showed() {
      this.show = !this.show;
    },
    openSelect() {
      this.selected = !this.selected;
    },
    closeSelect() {
      this.selected = false;
    },
    showCircle(e) {
      eventBus.$emit("circleshow", e, e.currentTarget);
    },
    changeCountry(country) {
      for (let i of this.lang) {
        i.active = false;
      }
      country.active = true;
      eventBus.$emit("progressStart");
      this.$store.commit("changeCountry", country.country);
      this.$store
        .dispatch("grabData")
        .then(() => eventBus.$emit("progressStop"));
    }
  },
  created() {
    eventBus.$on("closeSettings", e => {
      if (
        !e.target.classList.contains("setting__button") &&
        !document.querySelector(".settings").contains(e.target) &&
        !document.querySelector(".setting__button").contains(e.target)
      ) {
        this.show = false;
        this.selected = false;
      }
    });
  },
  computed: {
    checkDark() {
      return this.$store.getters.checkDark;
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.35s all;
}
.fade-enter,
.fade-leave-to {
  transform: scale(0, 0);
}
.fade-leave,
.fade-enter-to {
  transform: scale(1, 1);
}
.fade__top-enter-active,
.fade__top-leave-active {
  transition: 0.35s all;
}
.fade__top-enter,
.fade__top-leave-to {
  transform: translateY(-25px);
  opacity: 0;
}
.fade__top-enter-to
.fade__top-leave {
  transform: translateY(0);
  opacity: 1;
}
.active {
  color: #009ffd !important;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(30px);
  -ms-transform: translateX(30px);
  transform: translateX(30px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.settings__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 25%;
}
.setting__button {
  color: black !important;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.setting__button svg {
  margin-left: 5px;
  margin-top: 2px;
}
.setting__button__dark {
  color: white !important;
}
.setting__button:hover {
  color: #f60 !important;
  transition: 0.3s;
}
.settings {
  position: absolute;
  z-index: 99999;
  top: 150%;
  right: 0;
  width: 250px;
  height: 250px;
  background-color: white;
  box-shadow: 0px 4px 30px -12px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-weight: 300;
  justify-content: flex-start;
  align-items: center;
  font-family: "Roboto", sans-serif !important;
  font-size: 0.8rem;
}
.settings__dark {
  background-color: #1b1b1b !important;
  color: white !important;
}

.slider__container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.slider__container p {
  margin-right: 10px;
}
.country__container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
}
.settings::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  border-bottom: 10px solid white;
  box-shadow: 0px 4px 25px -5px rgba(0, 0, 0, 0.75);
  top: -10px;
  right: 15px;
  z-index: 100;
}
.settings__dark::after {
  border-bottom: 10px solid #1b1b1b !important;
}

.select {
  margin-top: 10px;
  width: 150px;
  height: 35px;
  border: 1px solid rgba(211, 211, 211, 1);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.select__dark {
  border: 1px solid rgb(35, 37, 40);
}
.not__selected {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid lightgrey;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
}
.selected {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid lightgrey;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
}
.options {
  width: 75%;
  background-color: white;
  box-shadow: 0px 2px 30px -10px rgba(0, 0, 0, 0.75);
  position: absolute;
  z-index: 99999;
  border-radius: 3px;
}
.options__dark {
  background-color: #212121 !important;
  color: white !important;
}
.options li {
  list-style: none;
  padding: 10px;
  cursor: pointer;
  margin: 5px;
  transition: 0.2s;
}
.options li:hover {
  background-color: rgba(244, 244, 244, 1);
}
.options__dark li:hover {
  background-color: rgba(244, 244, 244, 0.1) !important;
}
</style>