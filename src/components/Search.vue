<template>
  <div class="main__container">
    <div
      class="main__content"
      :class="{main__content__dark: darken}"
    >
      <div class="search__form">
        <p>Enter keywords to search for news:</p>
        <div class="search">
          <input
          placeholder="keywords..."
          type="text"
          :class="{search__form__dark: darken}"
          @keypress.enter="getData(keyword)"
          v-model="keyword"
        >
        <div class="search__button" @click="getData(keyword)" :class="{search__button__dark: darken}">
          <font-awesome-icon icon="search" />
        </div>
        </div>
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
.search {
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
}
.search__button {
  border: 1px solid rgba(211, 211, 211, 0.6);
  padding: 10px 25px 10px 25px;
  cursor: pointer;
  color: lightgrey;
  transition: 0.2s;
}
.search__button:hover {
  background-color: rgba(211, 211, 211, 0.1);
}
.search__button__dark {
  border: 1px solid rgba(40, 40, 40, 1) !important;
  color: white;
  background-color: rgba(19, 19, 19, 1) !important;
}
.search__form input {
  outline: none;
  width: 50%;
  padding: 10px;
  border: 1px solid rgba(211, 211, 211, 0.6);
  border-right: none;
}

.search__form__dark {
  background-color: rgba(19, 19, 19, 1) !important;
  color: white !important;
  border: 1px solid rgba(40, 40, 40, 1) !important;
   border-right: none !important;
}

.main__content__dark {
  background-color: #212121 !important;
  color: white !important;
}
</style>