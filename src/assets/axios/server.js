import axios from "axios";

const server = axios.create({
  baseURL: "https://sportiin.com/api/v1",
  headers: {
    lang: "en",
  },
});

export default server;
