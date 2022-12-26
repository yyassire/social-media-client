import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { userRequest } from "../../axios";
import { Avatar } from "@mui/material";

const Post = ({ post }) => {
  const token = useSelector((state) => state.user.currentUser.token);
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [likes, setLikes] = useState([...post.likes]);

  const userCredentials = useSelector((state) => state.user);
  const currentUser = userCredentials.currentUser.details;

  const handleLike = async () => {
    try {
      await userRequest(token).put(`posts/${post._id}/like`);
      setLikes((prev) => [...prev, currentUser._id]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlikeLike = async () => {
    try {
      await userRequest(token).put(`posts/${post._id}/like`);
      const newLikes = likes.filter((item) => {
        return item !== currentUser._id;
      });
      setLikes(newLikes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await userRequest(token).delete(`posts/${post._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {currentUser?.profilePic ? (
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={currentUser?.profilePic} alt="" />
              </Link>
            ) : (
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Avatar className="img" src="/broken-image.jpg" />
              </Link>
            )}

            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post?.username}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon
            style={{ cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && post.userId === currentUser._id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post?.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {likes.includes(currentUser._id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleUnlikeLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {likes?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments comments={post.comments} postId={post._id} />}
      </div>
    </div>
  );
};

export default Post;
