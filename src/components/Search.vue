<template>
  <div class="main__container">
    <div
      class="main__content"
      :class="{main__content__dark: darken}"
    >
      <div class="search__form">
        <p>Enter keywords to search for news:</p>
        <input
          placeholder="keywords..."
          type="text"
          :class="{search__form__dark: darken}"
          @keypress.enter="getData(keyword)"
          v-model="keyword"
        >
      </div>
      <Results
        :articles="articles"
        :syntax="$props.syntax"
        :darken="darken"
      />
    </div>
  </div>
</template>

<script>
import Results from "./Results";
export default {
  name: "Search",
  props: {
    syntax: {
      type: String,
      default: "home",
      required: true
    }
  },
  components: {
    Results
  },
  data() {
    return {
      keyword: this.$store.getters.keyword
    };
  },
  methods: {
    getData(e) {
      eventBus.$emit("progressStart");
      this.$store
        .dispatch("grabData", e)
        .then(() => {
          eventBus.$emit("progressStop");
          this.$store.commit("clearLastDataSearch");
          this.$store.commit("saveLastDataSearch");
        })
    }
  },
  computed: {
    darken() {
      return this.$store.getters.checkDark;
    },
    articles() {
      if (this.$store.getters.lastDataSearch.length > 0) {
        return this.$store.getters.lastDataSearch;
      } else {
        return this.$store.getters.getArticles;
      }
    }
  },
  created() {
    eventBus.$emit("highlighte", this.$props.syntax);
  },
  mounted() {
    eventBus.$emit("progressStop");
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 1rem;
}

.search__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
}

.search__form input {
  margin-top: 10px;
  outline: none;
  width: 50%;
  padding: 10px;
  border: 1px solid lightgray;
  margin: 20px;
}

.search__form__dark {
  background-color: rgba(19, 19, 19, 1) !important;
  color: white !important;
  border: 1px solid rgba(40, 40, 40, 1) !important;
}

.main__content__dark {
  background-color: #212121 !important;
  color: white !important;
}
</style>