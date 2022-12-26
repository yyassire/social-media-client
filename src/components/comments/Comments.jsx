import { useState } from "react";
import "./comments.scss";
import { userRequest } from "../../axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const Comments = ({ comments, postId }) => {
  const token = useSelector((state) => state.user.currentUser.token);
  const [desc, setDesc] = useState("");
  const [myComments, setMyComments] = useState([...comments]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!desc) {
      return alert("please write something");
    }
    const data = { id: postId, comment: desc };
    try {
      await userRequest(token).post("/posts/comment", data);
      setMyComments((prev) => [data, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <Avatar className="img" src="/broken-image.jpg" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {myComments.map((comment) => (
        <div className="comment">
          <Avatar className="img" src="/broken-image.jpg" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.comment}</p>
          </div>
          <span className="date">{moment(comment?.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
