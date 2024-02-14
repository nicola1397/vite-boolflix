<script>
import { store } from "./store.js";
import axios from "axios";
export default {
  data() {
    return {
      store,
      title: "",
      string: `${store.searchStr}+${this.title}+${store.apiKey}`,
    };
  },

  methods: {
    fetch() {
      axios
        .get(`${store.searchStr}${this.title}${store.apiKey}`)

        .then((response) => {
          const allResults = response.data.results;
          store.searchObj = allResults.filter(
            (result) => result.media_type != "person"
          );
        });
    },
  },
};
</script>

<template>
  <div class="input-group">
    <input
      class="form-control"
      type="search"
      placeholder="Search"
      v-model="title"
      @keydown="fetch()"
    />
    <button class="btn btn-danger" @click="fetch()">Search</button>
  </div>

  <ul>
    <li v-for="media in store.searchObj">
      <div class="card">
        <div class="card-header">
          <h2>{{ media.title || media.name }}</h2>
        </div>
        <div class="card-body">
          <h3>{{ media.original_title || media.original_name }}</h3>
          <h5>{{ media.original_language }}</h5>
          <span>{{ media.vote_average }}</span>
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
}

.input-group {
  margin: 10px;
}
</style>
