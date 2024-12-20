import axios from "axios";

const api = axios.create({
  baseURL: "https://news-room-project.onrender.com/api",
});

export const getArticles = (sortBy = "created_at", orderBy = "asc") => {
  return api
    .get("/articles", {
      params: {
        sort_by: sortBy,
        order: orderBy,
      },
    })
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => {
      console.error("Error fetching articles:", err);
      throw err;
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
    // console.log("patching article vote");
  });
};

export const postNewComment = (username, body, article_id) => {
  return api.post(`/articles/${article_id}/comments`, { username, body });
};

export const deleteComments = (comment_id) => {
  return api.delete(`/comments/${comment_id}`);
};
