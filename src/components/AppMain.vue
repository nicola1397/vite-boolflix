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
  methods: {},
  components: { AppCard },
};
</script>

<template>
  <div class="mainWrapper">
    <div class="thumbnail" v-for="media in store.searchObj">
      <AppCard :media="media"></AppCard>
    </div>
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
</style>
