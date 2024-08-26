import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });
const token  = cookies.get("token");

const server = axios.create({
  baseURL: "https://sportiin.com/api/v1",
  headers: {
    lang: "en",
    Authorization: token,
  },
});

export default server;
