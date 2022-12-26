import { useEffect, useState } from "react";
import "./stories.scss";
import { userRequest } from "../../axios";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
const Stories = () => {
  const currentUser = useSelector((state) => state.user.currentUser.details);
  const token = useSelector((state) => state.user.currentUser.token);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const dataFetching = async () => {
      try {
        const res = await userRequest(token).get("stories");
        console.log(res.data[0]);
        if (res.data.length) {
          setStories(res.data[0].slice(-4));
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    dataFetching();
  }, [token]);

  const upload = async (e) => {
    const myFile = e.target.files[0];
    console.log(e.target.files[0]);
    if (!myFile) return alert("you must choose an image file");
    const imageRef = ref(storage, `images/${myFile.name + v4()}`);
    uploadBytes(imageRef, myFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        await userRequest(token).post("stories", { img: url });
        window.location.reload();
      });
    });
  };
  return (
    <div className="stories">
      <div className="story">
        {currentUser?.profilePi ? (
          <img src={currentUser?.profilePi} alt="" />
        ) : (
          <Avatar className="img" src="/broken-image.jpg" />
        )}

        <span>{currentUser?.username}</span>
        <label className="button" htmlFor="file">
          {/* <button htmlFor="file">+</button> */}+
        </label>

        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={upload}
        />
      </div>
      {stories.map((story) => (
        <div className="story" key={story._id}>
          <img src={story?.img} alt="" />
          {/* <span>{story?.img}</span> */}
          <span>{story?.userName}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
