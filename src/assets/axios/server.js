import axios from "axios";

const lang = localStorage.getItem("lang");

const server = axios.create({
  baseURL: "https://api.learning.hopn.eu/api/v1",
  headers: {
    lang: lang || "en",
  },
});

export default server;
