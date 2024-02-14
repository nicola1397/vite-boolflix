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

        .then((response) => (store.movies = response.data.results));
    },
  },
};
</script>

<template>
  <input
    class="form-control"
    type="search"
    placeholder="Search"
    v-model="title"
  />
  <button class="btn btn-danger" @click="fetch()">Search</button>

  <ul>
    <li v-for="movie in store.movies">
      <h1>{{ movie.title }}</h1>
      <h3>{{ movie.original_title }}</h3>
      <span>{{ movie.original_language }}</span>
    </li>
  </ul>
</template>

<style scoped></style>
