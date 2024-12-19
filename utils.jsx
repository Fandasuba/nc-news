import { getCommentsForArticles, getUsers } from "./src/api";

const fetchCommentsAndAvatars = (article_id, setComments, setAvatars) => {
  getCommentsForArticles(article_id).then((data) => {
    setComments(data.comments);
  });
  getUsers().then((data) => {
    setAvatars(data.users);
  });
};

export { fetchCommentsAndAvatars };
