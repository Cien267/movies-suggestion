<template>
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
</template>

<script>
export default {
  name: "Movie",
  props: {
    dataMovie: Object || Function,
    youtubeTrailerId: String || Function,
  },
}
</script>
<style scoped>
@import "../../../static/css/style.css";
</style>
