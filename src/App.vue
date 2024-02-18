<script>
import { store } from "./store.js";
import { lang } from "./lang.js";
import { data } from "./data.js";

import AppHeader from "../src/components/AppHeader.vue";
import AppMain from "../src/components/AppMain.vue";
import AppTrend from "../src/components/AppTrend.vue";
import AppModal from "../src/components/AppModal.vue";

import axios from "axios";
export default {
  data() {
    return {
      store,
      lang,
      data,
    };
  },

  components: {
    AppHeader,
    AppMain,
    AppTrend,
    AppModal,
  },
};
</script>

<template>
  <AppHeader></AppHeader>
  <AppTrend v-if="!store.title"></AppTrend>
  <AppMain v-if="store.title"></AppMain>
  <AppModal v-if="data.isShown"></AppModal>
</template>

<style scoped></style>
