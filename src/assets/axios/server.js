import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });
const token = cookies.get("token");
const lang = localStorage.getItem("lang");

const server = axios.create({
  baseURL: "https://api.sportiin.com/api/v1",
  headers: {
    lang: lang || "en",
    Authorization: `Bearer ${token}`,
  },
});

export default server;
