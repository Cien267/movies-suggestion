<template>
  <div>
    <div class="wrapper-button">
      <input type="checkbox" @click="getMovieInfo" />
      <span><i class="icon-off"></i></span>
    </div>
    <div v-if="searched" class="circles">
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ButtonSuggest",
  props: {
    searched: Boolean || Function,
  },
  methods: {
    getMovieInfo() {
      this.$emit("getMovie")
    },
  },
}
</script>
<style scoped>
@import "../../../static/css/style.css";
</style>
