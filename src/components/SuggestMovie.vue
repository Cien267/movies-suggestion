<template>
  <div>
    <loading v-if="loading" />
    <div style="padding-bottom: 50px; display: flex; justify-content: center">
      <div class="arrow bounce" style=""></div>
    </div>

    <div
      :class="[showMovieInfo ? 'wrapper-scale' : '', 'wrapper']"
      @click="changeDoorStatus"
    >
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
        <div id="result">
          <div id="result-common-info">
            <img :src="dataMovie.Poster" alt="" id="result-poster" />
            <div>
              <div>
                <div id="result-title">
                  {{ dataMovie.Title }}
                </div>
                <div id="result-translated-title">
                  ({{ dataMovie.TranslatedTitle }})
                </div>
                <div id="result-rating">
                  <i class="fa fa-star checked"></i> {{ dataMovie.imdbRating }}
                </div>
                <div id="result-time-year">
                  <div>{{ dataMovie.Year }}</div>
                  -
                  <div>{{ dataMovie.Runtime.slice(0, -4) }} phút</div>
                </div>
              </div>
            </div>
          </div>
          <div id="result-main-info">
            <div id="result-genre">
              <div
                class="genre-element"
                v-for="(genre, index) in dataMovie.Genre"
                :key="index"
              >
                {{ genre }}
              </div>
            </div>
            <div id="result-plot">
              <div>Nội dung:</div>
              <p>{{ dataMovie.TranslatedPlot }}</p>
            </div>
            <div id="result-director">
              <div>Đạo diễn:</div>
              <p>{{ dataMovie.Director }}</p>
            </div>
            <div id="result-actor">
              <div>Diễn viên:</div>
              <p>{{ dataMovie.Actors }}</p>
            </div>
            <div id="result-country">
              <div>Quốc gia:</div>
              <p>{{ dataMovie.TranslatedCountry }}</p>
            </div>
            <div id="trailer">
              <div style="padding-bottom: 10px">Trailer:</div>
              <youtube
                player-width="100%"
                player-height="100%"
                v-if="youtubeTrailerId"
                :video-id="youtubeTrailerId"
              ></youtube>
            </div>
          </div>
        </div>
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
import movies from "../movies.json"
import translationMixin from "../mixin/translationMixin"
import Loading from "./Loading.vue"
const YOUTUBE_API_KEY = "AIzaSyDBqJDKoJWqrudtlb7v0-eRvaU4zj8Tu0Y"
const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3/search/"
export default {
  name: "SuggestMovie",
  mixins: [translationMixin],

  data() {
    return {
      open: false,
      searched: false,
      showMovieInfo: false,
      dataMovie: Object,
      loading: false,
      youtubeTrailerId: "",
    }
  },
  components: { Loading },
  methods: {
    async getMovie() {
      this.loading = true
      try {
        this.searched = true
        setTimeout(() => {
          this.searched = false
        }, 500)
        const choosenFilm = movies[Math.floor(Math.random() * movies.length)]
        let result = await axios.get(
          `https://www.omdbapi.com/?apikey=7859df6b&i=${choosenFilm.id}`
        )
        this.dataMovie = result.data

        //get youtube video
        const params = {
          part: "snippet",
          key: YOUTUBE_API_KEY,
          q:
            this.dataMovie.Title +
            " (" +
            this.dataMovie.Year +
            ")" +
            " official trailer",
          type: "video",
          maxResults: 1,
        }

        await axios
          .get(YOUTUBE_API_BASE_URL, { params })
          .then((response) => {
            this.youtubeTrailerId = response.data.items[0].id.videoId
          })
          .catch((error) => {
            console.log(error)
          })

        //translate
        const translatedCountry = await this.translate(result.data.Country)
        const translatedPlot = await this.translate(result.data.Plot)
        const translatedTitle = await this.translate(result.data.Title)
        let genreList = result.data.Genre.split(",")
        let translatedGenreList = []
        for (let i = 0; i < genreList.length; i++) {
          let translatedGenre = await this.translate(genreList[i])
          translatedGenreList.push(translatedGenre.translated_text)
        }

        this.dataMovie.Genre = translatedGenreList
        this.dataMovie.TranslatedCountry = translatedCountry.translated_text
        this.dataMovie.TranslatedPlot = translatedPlot.translated_text
        this.dataMovie.TranslatedTitle = translatedTitle.translated_text

        this.loading = false
        setTimeout(() => {
          this.open = true
          this.showMovieInfo = true
        }, 100)
      } catch (e) {
        console.log(e)
      }
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

<style scoped>
@import "../../static/css/style.css";
</style>
