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
  <!-- SEZIONE FILM -->
  <div v-if="store.searchType == `home` || store.searchType == `movie`">
    <h2>FILM</h2>
    <div v-if="store.searchMv.length == 0">
      <h3 class="missing">Nessun film trovato.</h3>
    </div>
    <div v-else class="mainWrapper">
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
  </div>
  <!-- SEZIONE SERIE TV -->
  <div v-if="store.searchType == `home` || store.searchType == `tv`">
    <h2>SERIE TV</h2>
    <div v-if="store.searchTv.length == 0">
      <h3 class="missing">Nessuna serie trovata.</h3>
    </div>
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

.missing {
  color: grey;
  text-align: center;
  font-weight: lighter;
}
</style>
