import axios from "axios";

export default axios.create({
  baseURL: "https://movies-api-challenge.herokuapp.com/api/",
  headers: {
    "Content-type": "application/json"
  }
});