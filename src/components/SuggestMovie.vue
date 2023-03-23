<template>
  <div>
    <loading v-if="loading" />
    <arrow />
    <div
      :class="[showMovieInfo ? 'wrapper-scale' : '', 'wrapper']"
      @click="changeDoorStatus"
    >
      <div v-if="!showMovieInfo" class="search-movies-wrapper">
        <button-suggest :searched="searched" @getMovie="getMovie" />
      </div>
      <div v-else class="container" style="width: 100%; height: 100%">
        <movie :dataMovie="dataMovie" :youtube-trailer-id="youtubeTrailerId" />
      </div>
      <doors :open="open" />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import movies from "../movies.json"
import translationMixin from "../mixin/translationMixin"
import Loading from "./parts/Loading.vue"
import Movie from "./parts/Movie.vue"
import Arrow from "./parts/Arrow.vue"
import Doors from "./parts/Doors.vue"
import ButtonSuggest from "./parts/ButtonSuggest.vue"
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
  components: { Loading, Movie, Arrow, Doors, ButtonSuggest },
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
