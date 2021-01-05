import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId), {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    });
  }

  return http.post(apiEndpoint, movie, {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
}
