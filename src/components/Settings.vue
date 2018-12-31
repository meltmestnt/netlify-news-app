<template>
  <div class="settings__container">
    <div class="setting__button">
      Settings
    </div>
    <div class="settings">
      <p>Enable dark theme</p>
      <label class="switch">
        <input type="checkbox" @change="darken()">
        <span class="slider round"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Settings',
    data() {
        return {

        }
    },
    methods: {
        darken() {
            this.$store.commit('darken');
        }
    }
};
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
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
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 5px;
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
  margin-right: 50px;
}
.setting__button {
  cursor: pointer;
}
.setting__button:hover {
  color: #f60;
  transition: 0.3s;
}
.settings {
  position: absolute;
  z-index: 999;
  top: 100%;
  right: 0;
  width: 200px;
  height: 250px;
  background-color: white;
  box-shadow: 0px 4px 25px -5px rgba(0, 0, 0, 0.75);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  color: black;
  font-weight: 300;
  justify-content: flex-start;
  align-items: center;
}
</style>