<script>
import { store } from "./store.js";
import { lang } from "./lang.js";
import AppHeader from "../src/components/AppHeader.vue";
import AppMain from "../src/components/AppMain.vue";
import AppTrend from "../src/components/AppTrend.vue";

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
    AppMain,
    AppTrend,
  },
};
</script>

<template>
  <AppHeader></AppHeader>
  <AppTrend v-if="!store.title"></AppTrend>
  <AppMain v-if="store.title"></AppMain>
</template>

<style scoped></style>
