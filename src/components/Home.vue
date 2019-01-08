<template>
  <div class="main__container">
    <div
      class="main__content"
      :class="{main__content__dark: darken}"
    >
      <Results
        :darken="darken"
        :syntax="$props.syntax"
        :articles="articles"
      />
    </div>
  </div>
</template>

<script>
import Results from "./Results";
export default {
  name: "Home",
  data() {
    return {
      incrementing: 1,
      remove: null,
      left: 0,
      top: 0,
      opacity: 0.4,
      show: false,
      refresh: null
    };
  },
  components: {
    Results
  },
  props: {
    syntax: {
      type: String,
      default: "home",
      required: true
    }
  },
  computed: {
    articles() {
      return this.$store.getters.getArticles;
    },
    darken() {
      return this.$store.getters.checkDark;
    },
    styleObj() {
      return {
        transform: `scale(${this.incrementing}, ${this.incrementing})`,
        left: `${this.left}px`,
        top: `${this.top}px`,
        opacity: `${this.opacity}`
      };
    }
  },
  methods: {
    check(image) {
      if (image) return image;
      else
        return "http://batanes.dost02.com/wp-content/themes/iloveit/images/no.image.600x300.png";
    },
    circleShow(ev) {
      let current = ev.currentTarget,
        increment = 1;
      if (current.querySelector(".circle").style.display == "block") return;

      this.left = ev.clientX - current.getBoundingClientRect().left;
      this.top = ev.clientY - current.getBoundingClientRect().top;
      current.querySelector(".circle").style.display = "block";
      this.remove = setInterval(() => {
        if (this.incrementing >= 250) {
          clearInterval(this.remove);
          this.incrementing = 0;
          this.opacity = 0.4;
          current.querySelector(".circle").style.display = "none";
        }
        increment += 0.5;
        this.opacity -= 0.012;
        this.incrementing += increment;
      }, 10);
    }
  },
  created() {
    eventBus.$emit("highlighte", this.$props.syntax);
    this.$store.dispatch("grabData");
  },
  mounted() {
    eventBus.$emit("progressStop");
  }
};
</script>
<style scoped>
.main__content__dark {
  background-color: #212121 !important;
  color: white !important;
}
</style>