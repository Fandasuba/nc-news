import axios from "axios";

const api = axios.create({
  baseURL: "https://news-room-project.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (articleID) => {
  console.log(articleID, "in Getaritcle by id in api");
  return api.get(`/articles/${articleID}`).then(({ data }) => {
    console.log(data, "data in articlebyidAPI");
    return data.article;
  });
};
