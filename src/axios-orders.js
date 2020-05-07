import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-a52da.firebaseio.com/",
});



export default instance;
