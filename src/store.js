import { reactive } from "vue";

export const store = reactive({
  apiKey: "&api_key=4b8b37773954577b9f89f3276308ce19",
  searchStrMov: "https://api.themoviedb.org/3/search/movie?query=",
  searchStrTv: "https://api.themoviedb.org/3/search/tv?query=",

  imgStr: "https://image.tmdb.org/t/p/w342/",
  pageStr: "&page=",
  pagesMv: "",
  pagesTv: "",
  nextPageMv: 2,
  nextPageTv: 2,
  searchMv: [],
  searchTv: [],
  trendingMv: [],
  trendingTv: [],
  title: "",
  searchType: "home",
});
