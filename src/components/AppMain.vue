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
    fetchMore() {
      if (store.nextPage <= parseInt(store.pages)) {
        axios
          .get(
            `${store.searchStr}${store.title}${store.apiKey}${store.pageStr}${store.nextPage}`
          )
          .then((response) => {
            const allResults = response.data.results;
            allResults.filter((result) => result.media_type != "person");
            store.searchObj = store.searchObj.concat(allResults);
          });
        store.nextPage++;
      }
    },
  },
  components: { AppCard },
};
</script>

<template>
  <div class="mainWrapper">
    <div class="thumbnail" v-for="media in store.searchObj">
      <AppCard :media="media"></AppCard>
    </div>
  </div>
  <div class="showMore">
    <button
      v-if="store.nextPage < store.pages"
      class="btn btn-danger"
      @click="fetchMore()"
    >
      Mostra altri
    </button>
  </div>
</template>

<style lang="scss" scoped>
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
