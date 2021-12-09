import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/genre";
const APP_KEY = "ddf41db1d60bbdc63dd8ea2c74f68fd6";

export function findGenres() {
  return axios.get(`${BASE_URL}/movie/list?api_key=${APP_KEY}`);
}