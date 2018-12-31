<template>
  <div class="main__container">
    <div class="main__content">
      <div
        class="articles"
        
      >
        <div
          class="article"
          v-for="article in articles"
          :key="article.url"
          @click="circleShow($event)"
        >
          <div
            class="circle"
            :style="styleObj"
          ></div>
          <a :href="article.url">
            <img
              :src="check(article.urlToImage)"
              alt=""
            >
          </a>
          <div class="info">
            <a
              :href="article.url"
              class="title"
            >{{article.title}}</a>
            <p>{{article.description}}</p>
            <div class="additional__info">
              <p>by {{checkAuthor(article.author)}} </p>
              <p>{{correctDate(article.publishedAt)}} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      incrementing: 1,
      remove: null,
      left: 0,
      top: 0,
      opacity: 0.2,
      show: false,
      refresh: null,
    };
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
      if (current.querySelector('.circle').style.display == 'block') return;
      
      this.left = ev.clientX - current.getBoundingClientRect().left;
      this.top = ev.clientY - current.getBoundingClientRect().top;
      current.querySelector('.circle').style.display = 'block';
      this.remove = setInterval(() => {
        if (this.incrementing >= 250) {
          clearInterval(this.remove);
          this.incrementing = 0;
          this.opacity = 0.2;
          current.querySelector('.circle').style.display = 'none';
        }
        increment += 0.5;
        this.opacity -= 0.007;
        this.incrementing += increment;
      }, 10);
    },
    correctDate(date) {
      let [, newDate, hours, minutes, seconds] = date.match(/(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})Z/),
          hour = new Date().getHours() - hours;
          
      return `${hour > 1 ? `${hour} hours` : `${hour}`} ago`;
    },
    checkAuthor(author) {
      if (author) return author;
      else return 'unknown';
    }
  },
  created() {
    eventBus.$emit("highlighte", this.$props.syntax);
    this.$store.dispatch("grabData");
    this.refresh = setInterval(() => this.$store.dispatch('grabData'), 30000);
  },
  mounted() {
    eventBus.$emit("progressStop");
  }
};
</script>
<style scoped>
.articles {
  width: 100%;
  min-height: 100%;
  font-weight: 600;
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
.article img {
  width: 100%;
  height: 100%;
  position: relative;
  opacity: 0.8;
  outline: none;
  border: none;
}
.circle {
  position: absolute;
  background-color: #f60;
  border-radius: 200px;
  width: 10px;
  display: none;
  height: 10px;
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
.additional__info {
  font-size: 0.7rem;
  color: rgba(95, 111, 129, 0.1);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
.additional__info p {
  margin-right: 10px;
  color: rgba(95, 111, 129, 0.8);
}
</style>