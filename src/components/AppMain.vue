<script>
import { store } from "../store.js";
import AppCard from "./AppCard.vue";
import axios from "axios";
export default {
  data() {
    return {
      store,
    };
  },

  methods: {
    fetchMoreTv() {
      console.log("fetching more series");
      if (store.nextPageTv <= parseInt(store.pagesTv)) {
        axios
          .get(
            `${store.searchStrTv}${store.title}${store.apiKey}${store.pageStr}${store.nextPageTv}`
          )
          .then((response) => {
            const moreTv = response.data.results;
            store.searchTv = store.searchTv.concat(moreTv);
          });
        store.nextPageTv++;
      }
    },
    fetchMoreMv() {
      console.log("fetching more movies");

      if (store.nextPageMv < parseInt(store.pagesMv)) {
        axios
          .get(
            `${store.searchStrMov}${store.title}${store.pageStr}${store.nextPageMv}${store.apiKey}`
          )
          .then((response) => {
            const moreMv = response.data.results;
            store.searchMv = store.searchMv.concat(moreMv);
          });
        store.nextPageMv++;
      }
    },
  },
  components: { AppCard },
};
</script>

<template>
  <h2>FILM</h2>

  <div class="mainWrapper">
    <div class="thumbnail" v-for="movie in store.searchMv">
      <AppCard :media="movie"></AppCard>
    </div>
  </div>
  <div class="showMore">
    <button
      v-if="store.nextPageMv < store.pagesMv"
      class="btn btn-danger"
      @click="fetchMoreMv()"
    >
      Mostra altri
    </button>
  </div>
  <h2>SERIE TV</h2>

  <div class="mainWrapper">
    <div class="thumbnail" v-for="series in store.searchTv">
      <AppCard :media="series"></AppCard>
    </div>
  </div>
  <div class="showMore">
    <button
      v-if="store.nextPageTv < store.pagesTv"
      class="btn btn-danger"
      @click="fetchMoreTv()"
    >
      Mostra altri
    </button>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  color: white;
  text-align: center;
}
.mainWrapper {
  margin: auto;
  width: 90vw;
  display: flex;
  flex-wrap: wrap;
}

.thumbnail {
  margin: 10px;
  display: block;
}

.showMore {
  text-align: center;

  button {
    margin: 20px;
  }
}
</style>
