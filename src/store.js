import { reactive } from "vue";

export const store = reactive({
  apiKey: "&api_key=4b8b37773954577b9f89f3276308ce19",
  searchStr: "https://api.themoviedb.org/3/search/movie?query=",
  movies: [],
});