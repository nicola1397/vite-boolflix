<script>
import { store } from "../store.js";
import axios from "axios";
export default {
  data() {
    return {
      store,
    };
  },
  created() {},

  methods: {
    resetPage() {
      store.title = "";
      store.searchType = "home";
    },
    fetchMovies() {
      axios
        .get(`${store.searchStrMov}${store.title}${store.apiKey}`)

        .then((response) => {
          store.pagesMv = response.data.total_pages;
          const allResults = response.data.results;
          store.searchMv = allResults;
        });
      store.nextPageMv = 1;
    },
    fetchTv() {
      axios
        .get(`${store.searchStrTv}${store.title}${store.apiKey}`)

        .then((response) => {
          store.pagesTv = response.data.total_pages;
          const allResults = response.data.results;
          store.searchTv = allResults;
        });
      store.nextPageTv = 1;
    },
    searchType(element) {
      console.log(element.id);
      store.searchType = element.id;
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg dark-bg">
    <div class="container-fluid">
      <div class="d-flex align-items-center">
        <a class="navbar-brand text-danger fs-3" href="#" @click="resetPage"
          >BOOLFLIX</a
        >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-text"
              aria-current="page"
              href="#"
              id="home"
              :class="{
                active: store.searchType == `home`,
              }"
              @click="searchType($event.target)"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-text"
              href="#"
              id="tv"
              :class="{
                active: store.searchType == `tv`,
              }"
              @click="searchType($event.target)"
              >Serie</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-text"
              href="#"
              id="movie"
              :class="{
                active: store.searchType == `movie`,
              }"
              @click="searchType($event.target)"
              >Film</a
            >
          </li>
        </ul>
      </div>
      <div class="col-6">
        <div class="input-group">
          <input
            class="form-control col-4"
            type="search"
            placeholder="Search"
            v-model="store.title"
            @keyup.enter="fetchMovies(), fetchTv()"
            @keyup="fetchMovies(), fetchTv()"
          />
          <button class="btn btn-danger" @click="fetchMovies(), fetchTv()">
            Search
          </button>
        </div>
      </div>
      <div>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-text dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.active {
  color: red !important;
}
.nav-text,
.nav-text:visited {
  color: white;
  text-decoration: none;
  margin: 10px;
  &:hover {
    color: red;
  }
}

.dark-bg {
  background-color: #191919;
}
.input-group {
  margin: 10px;
}
</style>
