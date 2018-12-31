<template>
  <div class="main__container">
    <div class="main__content">
      Search
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    syntax: {
      type: String,
      default: "home",
      required: true
    }
  },
  created() {
      eventBus.$emit('highlighte', this.$props.syntax);
  },
  mounted() {
    eventBus.$emit('progressStop')
  }
};
</script>

<style scoped>



</style>