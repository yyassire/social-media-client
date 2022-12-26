import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { userRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Update from "../../components/update/Update";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
const myImage =
  "https://firebasestorage.googleapis.com/v0/b/social-89bc3.appspot.com/o/images%2Fhand-painted-watercolor-pastel-sky-background_23-2148902771.webp?alt=media&token=3cd124b5-e65d-4467-8fd2-9e53c294a9f3";
const Profile = () => {
  const token = useSelector((state) => state.user.currentUser.token);
  const theCurrentUser = useSelector((state) => state.user.currentUser.details);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const userId = useLocation().pathname.split("/")[2];

  const handleUnFollow = async () => {
    try {
      await userRequest(token).get(`users/${userId}/unfollow`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async () => {
    try {
      await userRequest(token).get(`users/${userId}/follow`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const dataFetching = async () => {
      const res = await userRequest(token).get("users/" + userId);
      setCurrentUser(res.data);
    };
    dataFetching();
  }, [userId, token]);
  if (!currentUser) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="profile">
      <div className="images">
        {currentUser?.coverPi ? (
          <img src={currentUser?.coverPi} alt="" className="cover" />
        ) : (
          <img src={myImage} alt="" className="cover" />
        )}
        {currentUser.profilePi ? (
          <img src={currentUser?.profilePi} alt="" className="profilePic" />
        ) : (
          <Avatar className="profilePic" src="/broken-image.jpg" />
        )}
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{currentUser.username}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{currentUser?.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{currentUser?.website}</span>
              </div>
            </div>
            {userId === theCurrentUser._id ? (
              <button onClick={() => setOpenUpdate(true)}>update</button>
            ) : currentUser?.followers?.includes(theCurrentUser._id) ? (
              <button onClick={handleUnFollow}>following</button>
            ) : (
              <button onClick={handleFollow}>follow</button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts username={currentUser.username} isLocal={true} />
      </div>

      {openUpdate && <Update setOpenUpdate={setOpenUpdate} />}
    </div>
  );
};

export default Profile;
