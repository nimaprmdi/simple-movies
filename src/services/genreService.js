import http from "./httpServices";
import config from "./config.json";
import axios from "axios";

export function getGenres() {
    return axios.get(config.apiUrl + "/genres");
}
