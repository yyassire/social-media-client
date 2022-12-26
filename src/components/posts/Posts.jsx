import Post from "../post/Post";
import "./posts.scss";
import { userRequest } from "../../axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Posts = ({ username, isLocal }) => {
  const token = useSelector((state) => state.user.currentUser.token);
  const [posts, setPosts] = useState([]);
  console.log(username);
  useEffect(() => {
    const dataFetching = async () => {
      let res;
      try {
        if (isLocal) {
          if (!username) {
            return;
          }
          res = await userRequest(token).get(`posts/profile/${username}`);
        } else {
          res = await userRequest(token).get("posts/user/timeline");
        }
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetching();
  }, [token, isLocal, username]);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
