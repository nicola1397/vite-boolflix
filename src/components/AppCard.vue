<script>
import { store } from "../store.js";
import { lang } from "../lang.js";

import axios from "axios";
export default {
  data() {
    return {
      store,
      lang,
    };
  },
  props: {
    media: Object,
  },
  methods: {
    getFlag(code) {
      const isoCode = lang[code];
      if (isoCode) {
        return `https://flagsapi.com/${isoCode.toUpperCase()}/shiny/64.png`;
      } else {
        return `https://flagsapi.com/UG/shiny/64.png`;
      }
    },
    starRating(rating) {
      const stars = Math.round(rating / 2);
      return stars;
    },
  },
};
</script>

<template>
  <div class="movieCard">
    <div class="cardContainer">
      <img
        v-if="media.poster_path"
        class="coverImg"
        :src="`${store.imgStr}${media.poster_path}`"
        alt="..."
      />

      <div v-else class="titleBackdrop">
        <h3 class="coverTitle">{{ media.title || media.name }}</h3>
      </div>

      <div class="movie-cardBack">
        <h2>{{ media.title || media.name }}</h2>
        <span class="category">Titolo originale</span>

        <h5>{{ media.original_title || media.original_name }}</h5>
        <span>Lingua</span>
        <div>
          <img :src="getFlag(media.original_language)" alt="" />
        </div>

        <span> Voto: </span>
        <span>
          <i
            v-for="x in 5"
            :class="
              x <= starRating(media.vote_average)
                ? `bi bi-star-fill`
                : `bi bi-star`
            "
          ></i
        ></span>
        <span>Trama</span>
        <div class="overview">
          <p>{{ media.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
[class~="bi"] {
  color: yellow !important;
}

.movieCard {
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  display: flex;

  .cardContainer {
    display: flex;
    justify-content: center;
    width: 300px;
    height: 500px;
    background-color: black;

    .movie-cardBack {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 300px;
      height: 500px;
      background-color: rgba(0, 0, 0, 0.8);
      overflow: hidden;

      * {
        background-color: transparent;
        color: white;
      }
    }
  }
}

.movieCard:hover .movie-cardBack {
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  text-align: center;
}

.movieCard:hover .movie-cardBack .coverImg {
  height: 100%;
  display: block;
}
.titleBackdrop {
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.coverTitle {
  color: white;
  background-color: transparent;
  text-align: center;
}

.overview {
  margin-top: 10px;
  height: 100%;
  overflow-y: auto;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
