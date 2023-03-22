<template>
  <div>
    <div style="padding-bottom: 50px; display: flex; justify-content: center">
      <div class="arrow bounce" style=""></div>
    </div>

    <div class="wrapper" @click="changeDoorStatus">
      <div v-if="!showMovieInfo" class="search-movies-wrapper">
        <div class="wrapper-button">
          <input type="checkbox" @click="getMovie" />
          <span><i class="icon-off"></i></span>
        </div>
        <div v-if="searched" class="circles">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
        </div>
      </div>
      <div v-else class="container" style="width: 100%; height: 100%">
        <div id="result">hehee</div>
      </div>
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
  </div>
</template>

<script>
import axios from "axios"
import movies from "./movies.json"

export default {
  data() {
    return {
      open: false,
      searched: false,
      showMovieInfo: false,
      dataMovie: Object,
    }
  },
  name: "App",
  components: {},
  async mounted() {
    const choosenFilm = movies[Math.floor(Math.random() * movies.length)]
        let result = await axios.get(
          `http://www.omdbapi.com/?apikey=7859df6b&i=${choosenFilm.id}`
        )

        console.log(result.data.Plot);

        const encodedParams = new URLSearchParams();
        encodedParams.append("from", "en");
        encodedParams.append("to", "vi");
        encodedParams.append("text", result.data.Plot);

        const options = {
          method: 'POST',
          url: 'https://translo.p.rapidapi.com/api/v3/translate',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'b8a96d1ca1msh2d5203eaa785f1fp130238jsna0941ed6f213',
            'X-RapidAPI-Host': 'translo.p.rapidapi.com'
          },
          data: encodedParams
        };

        axios.request(options).then(function (response) {
          console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });

  },
  methods: {
    async getMovie() {
      try {
        this.searched = true
        setTimeout(() => {
          this.searched = false
        }, 500)
        const choosenFilm = movies[Math.floor(Math.random() * movies.length)]
        let result = await axios.get(
          `http://www.omdbapi.com/?apikey=7859df6b&i=${choosenFilm.id}`
        )
        this.dataMovie = result.data
        console.log(this.dataMovie)
        setTimeout(() => {
          this.open = true
          this.showMovieInfo = true
        }, 500)
      } catch (e) {}
    },
    changeDoorStatus() {
      this.open = !this.open
      if (this.showMovieInfo) {
        setTimeout(() => {
          this.showMovieInfo = false
        }, 1000)
      }
    },
  },
  computed: {},
}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  width: 100%;
  background-color: #03263f;
  background: linear-gradient(to right, #2c5364, #196f8c, #03263f);
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.arrow {
  width: 40px;
  height: 40px;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yOTMuNzUxLDQ1NS44NjhjLTIwLjE4MSwyMC4xNzktNTMuMTY1LDE5LjkxMy03My42NzMtMC41OTVsMCwwYy0yMC41MDgtMjAuNTA4LTIwLjc3My01My40OTMtMC41OTQtNzMuNjcyICBsMTg5Ljk5OS0xOTBjMjAuMTc4LTIwLjE3OCw1My4xNjQtMTkuOTEzLDczLjY3MiwwLjU5NWwwLDBjMjAuNTA4LDIwLjUwOSwyMC43NzIsNTMuNDkyLDAuNTk1LDczLjY3MUwyOTMuNzUxLDQ1NS44Njh6Ii8+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjIwLjI0OSw0NTUuODY4YzIwLjE4LDIwLjE3OSw1My4xNjQsMTkuOTEzLDczLjY3Mi0wLjU5NWwwLDBjMjAuNTA5LTIwLjUwOCwyMC43NzQtNTMuNDkzLDAuNTk2LTczLjY3MiAgbC0xOTAtMTkwYy0yMC4xNzgtMjAuMTc4LTUzLjE2NC0xOS45MTMtNzMuNjcxLDAuNTk1bDAsMGMtMjAuNTA4LDIwLjUwOS0yMC43NzIsNTMuNDkyLTAuNTk1LDczLjY3MUwyMjAuMjQ5LDQ1NS44Njh6Ii8+DQo8L3N2Zz4=);
  background-size: contain;
}

.bounce {
  animation: bounce 1.5s infinite;
}
.wrapper {
  height: 300px;
  width: 250px;
  border: 5px solid #0863ae;
  position: relative;
  /* 3D */
  perspective: 1000px;
  z-index: 9999;
}

.search-movies-wrapper {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(
    60deg,
    #3d3393 0%,
    #2b76b9 37%,
    #2cacd1 65%,
    #35eb93 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
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
  z-index: 9999;
}
#left-door {
  top: 0;
  left: 0;
  border-right: 1px solid black;
  /* transition */
  transform-origin: left;
  transition: transform 1s;
}

#right-door {
  top: 0;
  right: 0;
  border-left: 1px solid black;
  /* transition */
  transform-origin: right;
  transition: transform 1s;
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
.left-door-open {
  transform: rotateY(-140deg);
}

.right-door-open {
  transform: rotateY(140deg);
}
.wrapper-button {
  width: 100px;
  height: 100px;
  margin: 60px auto;
  position: relative;
  z-index: 99;
}
.wrapper-button:active {
  border-radius: 10%;
}
span {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #b25244;
  background: linear-gradient(#f7f2f6, #b2ac9e);
  position: relative;
  color: #a5a39d;
  font-size: 30px;
  text-align: center;
  transition: all 0.3s ease-out;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.25);
  z-index: -1;
  box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.13),
    0 5px 8px rgba(0, 0, 0, 0.3), 0 10px 10px 4px rgba(0, 0, 0, 0.3);
}

span:after {
  content: "";
  position: absolute;
  left: -20px;
  right: -20px;
  top: -20px;
  bottom: -20px;
  z-index: -2;
  border-radius: inherit;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.15);
}

span:before {
  content: "";
  position: absolute;
  left: -10px;
  right: -10px;
  top: -10px;
  bottom: -10px;
  z-index: -1;
  border-radius: inherit;
  box-shadow: inset 0 10px 10px rgba(0, 0, 0, 0.13);
  -webkit-filter: blur(1px);
  filter: blur(1px);
}

input:checked ~ span {
  box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.13),
    0 5px 8px rgba(0, 0, 0, 0.35), 0 3px 10px 4px rgba(0, 0, 0, 0.2);
  color: #9abb82;
}

.icon-off:after {
  content: "";
  display: block;
  position: absolute;
  width: 70%;
  height: 70%;
  left: 50%;
  top: 50%;
  z-index: 80;
  margin: -35% 0 0 -35%;
  border-radius: 50%;
  background: linear-gradient(#52400f, #d2cbc3);
  box-shadow: 0 -2px 5px rgba(255, 255, 255, 0.05),
    0 2px 5px rgba(255, 255, 255, 0.1);
  -webkit-filter: blur(1px);
  filter: blur(1px);
}

input {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 100;
  position: absolute;
  cursor: pointer;
}
.circles {
  height: 90vmin;
  position: fixed;
  width: 90vmin;
}
.circles > div {
  animation: growAndFade 0.5s infinite ease-out;
  background-color: dodgerblue;
  border-radius: 50%;
  height: 100%;
  opacity: 0;
  position: absolute;
  width: 100%;
}

@keyframes growAndFade {
  0% {
    opacity: 0.4;
    transform: scale(0);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
</style>
