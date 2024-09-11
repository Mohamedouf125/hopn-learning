import axios from "axios";

const lang = localStorage.getItem("lang");

const server = axios.create({
  baseURL: "https://api.sportiin.com/api/v1",
  headers: {
    lang: lang || "en",
  },
});

export default server;
