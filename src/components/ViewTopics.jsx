import { useNavigate } from "react-router-dom";
import SortMenu from "./SortMenu";

const ViewTopics = () => {
  const navigate = useNavigate();

  const handleOnClick = (topic) => {
    navigate(`/topics/${topic}`);
  };
  return (
    <>
      <strong>plan is to filter a snippet at some point here</strong>
    </>
  );
};
export default ViewTopics;
