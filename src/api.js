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
  // console.log(articleID, "in Getarticle by id in api");
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

export const getUsers = (author) => {
  return api.get(`/users`).then(({ data }) => {
    return data;
  });
};

export const patchArticleVotes = (article_id, vote) => {
  return api.patch(`/articles/${article_id}`, { inc_votes: vote }).then(() => {
    console.log("patching article vote");
  });
};
