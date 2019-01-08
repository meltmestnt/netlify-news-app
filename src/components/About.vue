<template>
  <div class="main__container">
    <div class="main__content" :class="{main__content__dark: darken}">
      <div class="info">
        <p>
          This is just an example of using Vue.js, vue-router, axios, and news API.
          <a href="https://newsapi.org/">https://newsapi.org/</a>
          <a href="https://ru.vuejs.org/">https://ru.vuejs.org/</a>
          <a href="https://github.com/axios/axios">https://github.com/axios/axios</a>
          <a href="https://router.vuejs.org">https://router.vuejs.org</a>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  props: {
    syntax: {
      type: String,
      default: "home",
      required: true
    }
  },
  created() {
    eventBus.$emit("highlighte", this.$props.syntax);
  },
  mounted() {
    eventBus.$emit("progressStop");
  },
  computed: {
    darken() {
      return this.$store.getters.checkDark;
    }
  }
};
</script>

<style scoped>
.info p {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
}
a {
  text-decoration: none;
}
.main__content__dark {
  background-color: #212121 !important;
  color: white !important;
}
</style>