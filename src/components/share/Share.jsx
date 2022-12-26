import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useState } from "react";

import { userRequest } from "../../axios";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { Avatar } from "@mui/material";
const Share = () => {
  const currentUser = useSelector((state) => state.user.currentUser.details);
  const token = useSelector((state) => state.user.currentUser.token);
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const myUpload = async (e) => {
    setFile(e.target.files[0]);
    const myFile = e.target.files[0];
    if (!myFile) return alert("you must choose an image file");
    const imageRef = ref(storage, `images/${myFile.name + v4()}`);
    uploadBytes(imageRef, myFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        setImageUrl(url);
      });
    });
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!desc && !file) {
      return alert("write or choose a pic to share");
    }
    try {
      const data = { img: imageUrl ? imageUrl : "", desc };
      await userRequest(token).post("posts", data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {currentUser?.profilePi ? (
              <img src={currentUser?.profilePi} alt="" />
            ) : (
              <Avatar className="img" src="/broken-image.jpg" />
            )}

            <input
              type="text"
              placeholder={`What's on your mind ${currentUser?.username}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="thefile"
              style={{ display: "none" }}
              onChange={myUpload}
            />
            <label htmlFor="thefile">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
