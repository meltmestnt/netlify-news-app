<template>
  <div class="articles">
    <transition-group name="flip-list">
      <div
        class="article"
        v-for="article in articles"
        :key="article.url"
        @click="showCircle($event)"
        :class="{article__dark: darken}"
      >
        <Circlee
          :darken="darken"
          :delay="5"
        />
        <a :href="article.url">
          <img
            :src="check(article.urlToImage)"
            alt=""
          >
        </a>
        <div
          class="info"
          :class="{info__dark: darken}"
        >
          <a
            :href="article.url"
            class="title"
            :class="{title__dark: darken}"
          >{{article.title}}</a>
          <p>{{article.description}}</p>
          <div
            class="additional__info"
            :class="{additional__info__dark: darken}"
          >
            <p>by {{checkAuthor(article.author)}} </p>
            <p>{{correctDate(article.publishedAt)}} </p>
          </div>
        </div>
      </div>
    </transition-group>

  </div>
</template>

<script>
import Circlee from "./Circlee";
export default {
  name: "Home",
  components: {
    Circlee
  },
  data() {
    return {
      refresh: null,
      show: true
    };
  },
  props: {
    syntax: {
      type: String,
      default: "home",
      required: true
    },
    articles: {
      type: Array,
      required: true
    },
    darken: {
      type: Boolean,
      required: true
    }
  },
  beforeDestroy() {
    this.$store.commit("clearArticles");
  },

  methods: {
    check(image) {
      if (image) return image;
      else
        return "http://batanes.dost02.com/wp-content/themes/iloveit/images/no.image.600x300.png";
    },
    showCircle(e) {
      eventBus.$emit('circleshow', e, e.currentTarget)
    },

    correctDate(date) {
      let [, day, hours, minutes, seconds] = date.match(
          /\d{4}-\d{2}-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/
        ),
        hour = new Date().getHours() - hours;
      if (hour <= 0) hour = 24 + hour;
      let minute = new Date().getMinutes() - minutes;
      if (minute <= 0) minute = 60 + minute;
      day = new Date().getDate() - day;
      if (day < 0) day = 31 - day;
      return `${
        day == 0 ? "today" : day == -1 ? "yesterday" : `${day} days ago`
      } ${hour > 1 ? `${hour} hours` : `${hour}`} ${minute} minutes ago`;
    },
    checkAuthor(author) {
      if (author) return author;
      else return "unknown";
    }
  }
};
</script>
<style scoped>
.articles {
  width: 100%;
  min-height: 100%;
  display: flex;
}
.flip-list-move {
  transition: transform 1s;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: 0.3s all;
}
.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
}
.article {
  width: 100%;
  height: 150px;
  border-top: 1px solid rgba(95, 111, 129, 0.1);
  border-bottom: 1px solid rgba(95, 111, 129, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding: 5px;
  position: relative;
  font-weight: 300;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
}
.article__dark {
  background-color: #212121 !important;
  font-weight: 300;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
}
.article__dark:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}
.article > a {
  width: 20%;
  max-width: 250px;
  height: 100%;
  position: relative;
}
.article .title {
  text-decoration: none;
  display: inline;
  font-size: 1rem;
  color: #e3170a;
}
.title__dark {
  color: white !important;
  font-family: "Roboto", sans-serif !important;
}
.article img {
  width: 100%;
  height: 100%;
  position: relative;
  opacity: 0.8;
  outline: none;
  border: none;
}

.article > a::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  z-index: 99;
  height: 100%;
  background: rgba(95, 111, 129, 0.1);
}

.article .info {
  width: 80%;
  font-size: 0.8rem;
  color: black;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.info__dark {
  font-family: "Roboto", sans-serif !important;
  color: white !important;
}
.additional__info {
  font-size: 0.7rem;
  color: rgba(95, 111, 129, 0.1);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: "Roboto", sans-serif !important;
}
.additional__info__dark p {
  color: rgba(255, 255, 255, 0.7) !important;
}
.additional__info p {
  margin-right: 10px;
  color: rgba(95, 111, 129, 0.8);
}
</style>