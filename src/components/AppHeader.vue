<script>
import { store } from "../store.js";
import axios from "axios";
export default {
  data() {
    return {
      store,
    };
  },

  methods: {
    fetch() {
      axios
        .get(
          `${store.searchStr}${store.title}${store.apiKey}${store.pageStr}${store.nextPage}`
        )

        .then((response) => {
          store.pages = response.data.total_pages;
          const allResults = response.data.results;
          store.searchObj = allResults.filter(
            (result) => result.media_type != "person"
          );
        });
      store.nextPage = 1;
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg dark-bg">
    <div class="container-fluid">
      <a class="navbar-brand text-danger" href="#">BOOLFLIX</a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-text" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-text" href="#">Serie</a>
        </li>
        <li class="nav-item">
          <a class="nav-text" href="#">Film</a>
        </li>
      </ul>
      <div class="input-group">
        <input
          class="form-control col-4"
          type="search"
          placeholder="Search"
          v-model="store.title"
          @keyup.enter="fetch()"
          @keydown="fetch()"
        />
        <button class="btn btn-danger" @click="fetch()">Search</button>
      </div>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
  </nav>
</template>

<style lang="scss" scoped>
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
