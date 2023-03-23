<template>
  <div>
    <div id="left-door" :class="[open ? 'left-door-open' : '', 'door']">
      <div class="shape"></div>
      <div class="shape"></div>
      <div id="left-knob" class="knob"></div>
    </div>
    <div id="right-door" :class="[open ? 'right-door-open' : '', 'door']">
      <div class="shape"></div>
      <div class="shape"></div>
      <div id="right-knob" class="knob"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Doors",
  props: {
    open: Boolean || Function,
  },
}
</script>
<style scoped>
@import "../../../static/css/style.css";
</style>
