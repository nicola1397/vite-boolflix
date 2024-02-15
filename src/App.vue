<script>
import { store } from "./store.js";
import { lang } from "./lang.js";
import AppHeader from "../src/components/AppHeader.vue";

import axios from "axios";
export default {
  data() {
    return {
      store,
      lang,
    };
  },
  components: {
    AppHeader,
  },

  methods: {
    getFlag(code, index) {
      const isoCode = lang[code];
      console.log("codice:" + isoCode + "indice:" + index);
      if (isoCode) {
        return `https://flagsapi.com/${isoCode.toUpperCase()}/shiny/64.png`;
      } else {
        return `https://flagsapi.com/UG/shiny/64.png`;
      }
    },
    starRating(rating) {
      // ROUND TO HALF STAR
      // const stars = Math.round(((rating / 2) * 0.5) / 0.5);

      // ROUND TO FULL
      const stars = Math.round(rating / 2);
      return stars;
    },
  },
};
</script>

<template>
  <AppHeader></AppHeader>
  <ul>
    <li v-for="(media, index) in store.searchObj">
      <div class="card">
        <img
          v-if="media.backdrop_path"
          :src="`${store.imgStr}${media.backdrop_path}`"
          class="card-img-top"
          alt="..."
        />

        <div v-else class="titleBackdrop">
          <h3 class="coverTitle">{{ media.title || media.name }}</h3>
        </div>

        <div class="card-header">
          <h2>{{ media.title || media.name }}</h2>
        </div>
        <div class="card-body">
          <h3>{{ media.original_title || media.original_name }}</h3>
          <span
            ><img :src="getFlag(media.original_language, index)" alt=""
          /></span>
          <span
            ><i
              v-for="x in 5"
              :class="
                x <= starRating(media.vote_average)
                  ? `bi bi-star-fill`
                  : `bi bi-star`
              "
            ></i>
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px;
  display: inline-block;
  width: calc(100% / 5 - 20px);
  height: 600px;
}

[class~="bi"] {
  color: yellow;
}

.titleBackdrop {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 169px;
}

.coverTitle {
  color: white;
  text-align: center;
  line-height: 169px;
}
</style>
