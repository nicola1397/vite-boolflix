<script>
import { store } from "./store.js";
import { lang } from "./lang.js";
import AppHeader from "../src/components/AppHeader.vue";
import AppMain from "../src/components/AppMain.vue";

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
  },
};
</script>

<template>
  <AppHeader></AppHeader>
  <AppMain></AppMain>
</template>

<style scoped></style>
