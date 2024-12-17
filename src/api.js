import axios from "axios";

const api = axios.create({
  baseURL: "https://news-room-project.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (article_id) => {
  // console.log(articleID, "in Getaritcle by id in api");
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    // console.log(data, "data in articlebyidAPI");
    return data.article;
  });
};

export const getCommentsForArticles = (article_id) => {
  return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
    //console.log(data, "in GetComments API request");
    return data;
  });
};
