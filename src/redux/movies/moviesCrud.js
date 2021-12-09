import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const APP_KEY = "ddf41db1d60bbdc63dd8ea2c74f68fd6";

export function findMovies(page) {
  return axios.get(`${BASE_URL}/now_playing?api_key=${APP_KEY}&page=${page}`);
}

export function findMoviesSimilar(id) {
  return axios.get(`${BASE_URL}/${id}/similar?api_key=${APP_KEY}`);
}

export function findMovie(id) {
  return axios.get(`${BASE_URL}/${id}?api_key=${APP_KEY}`);
}