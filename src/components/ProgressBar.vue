<template>
  <div class="progressbar__container">
    <div
      class="progressbar"
      :style="{width: `${incrementing}%`}"
    >

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      incrementing: 0,
      interval: null,
      delay: true
    };
  },
  mounted() {
    setTimeout(() => (this.delay = false), 200);
  },
  watch: {
    delay() {
      if (this.incrementing >= 100) {
        this.set();
      }
    }
  },
  created() {
    this.start();
  },
  methods: {
    start() {
      this.increment();
      eventBus.$on("progressStop", () => {
        this.set();
      });
      eventBus.$on("progressStart", () => {
          this.start();
      })
    },
    increment() {
      this.interval = setInterval(() => {
        this.incrementing += 0.1;
        if (this.incrementing >= 100) {
          this.set();
        }
      }, 10);
    },
    stop() {
      this.incrementing = 0;
      clearInterval(this.interval);
    },
    set() {
      this.incrementing = 100;
      setTimeout(() => this.stop(), 400);
    }
  }
};
</script>

<style scoped>
.progressbar__container {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  height: 2px;
}
.progressbar {
  width: 100%;
  height: 100%;
  background-color: #f3c300;
}
</style>