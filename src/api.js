import axios from "axios";

const api = axios.create({
  baseURL: "https://news-room-project.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then(({ data }) => {
    return data.articles;
  });
};
