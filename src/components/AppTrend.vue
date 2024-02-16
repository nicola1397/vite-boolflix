<script>
import { store } from "../store.js";
import axios from "axios";
import AppCard from "./AppCard.vue";

export default {
  data() {
    return {
      store,
      isDown: false,
      startX: "",
      scrollLeft: "",
      ref1: "target1",
      ref2: "target2",
    };
  },

  components: { AppCard },

  methods: {
    fetchTrendingMv() {
      axios
        .get(`https://api.themoviedb.org/3/trending/movie/week?${store.apiKey}`)
        .then((response) => {
          const allResults = response.data.results;
          store.trendingMv = allResults;
        });
    },
    fetchTrendingTv() {
      axios
        .get(`https://api.themoviedb.org/3/trending/tv/week?${store.apiKey}`)
        .then((response) => {
          const allResults = response.data.results;
          store.trendingTv = allResults;
        });
    },

    mousedown(event, ref) {
      this.isDown = true;
      this.startX = event.pageX;
      this.scrollLeft = this.$refs[ref].scrollLeft;
    },
    mousemove(event, ref) {
      if (!this.isDown) return;
      event.preventDefault();
      const x = event.pageX;
      const walk = x - this.startX;
      this.$refs[ref].scrollLeft -= walk * 0.03;
    },
  },
  created() {
    this.fetchTrendingMv(), this.fetchTrendingTv();
  },
};
</script>

<template>
  <h2>FILM DI TENDENZA</h2>

  <div
    class="mainWrapper"
    :ref="ref1"
    @mousedown="mousedown($event, ref1)"
    @mouseleave="this.isDown = false"
    @mouseup="this.isDown = false"
    @mousemove="mousemove($event, ref1)"
  >
    <div class="thumbnail" v-for="media in store.trendingMv">
      <AppCard :media="media"></AppCard>
    </div>
  </div>
  <h2>SERIE DI TENDENZA</h2>
  <div
    class="mainWrapper"
    :ref="ref2"
    @mousedown="mousedown($event, ref2)"
    @mouseleave="this.isDown = false"
    @mouseup="this.isDown = false"
    @mousemove="mousemove($event, ref2)"
  >
    <div class="thumbnail" v-for="media in store.trendingTv">
      <AppCard :media="media"></AppCard>
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
  flex-wrap: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.thumbnail {
  margin: 10px;
  display: block;
}
</style>
