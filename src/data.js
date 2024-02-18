import { reactive } from "vue";

export const data = reactive({
  apiKey: "?api_key=4b8b37773954577b9f89f3276308ce19",
  id: "",
  mediaType: "",
  searchDetails: `https://api.themoviedb.org/3/`,
  imgStr: "https://image.tmdb.org/t/p/w500",
  prStr: "https://image.tmdb.org/t/p/w45",
  details: [],
  credits: [],
  isShown: false,
});
