<template>

  <div class="wrapper" @click="open = !open">
    <div class="search-movies-wrapper"></div>
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
  data(){
    return{
      open: false
    }
  },
  name: 'App',
  components: {

  },
  methods:{

  },
  computed: {

  }
}
</script>
<style>
/* General Style */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  width: 100%;
  background-color: #03263f;
   background: linear-gradient(to right,#2c5364, #196f8c, #03263f);
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  height: 300px;
  width: 250px;
  border: 5px solid #284822;
  position: relative;
  /* 3D */
  perspective: 1000px;
}

.search-movies-wrapper {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #5da5d7;
}

.door {
  background-color: #43bac7;
  height: 100%;
  width: 50%;
  position: absolute;
  /* inner layout */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
#left-door {
  top: 0;
  left: 0;
  border-right: 1px solid black;
  /* transition */
  transform-origin: left;
  transition: transform 0.5s;
}

#right-door {
  top: 0;
  right: 0;
  border-left: 1px solid black;
  /* transition */
  transform-origin: right;
  transition: transform 0.5s;
}

.shape {
  border: 4px solid black;
  width: 100px;
  height: 130px;
}

.knob {
  width: 10px;
  height: 50px;
  background-color: rgb(9, 10, 40);
  position: absolute;
}

#left-knob {
  top: 50%;
  right: 10px;
}

#right-knob {
  top: 50%;
  left: 10px;
}

/* Door swing effect */
.left-door-open{
  transform: rotateY(-140deg);
}

.right-door-open{
  transform: rotateY(140deg);
}

 </style>
