import { useState } from "react";
import "./update.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { userRequest } from "../../axios";

const Update = ({ setOpenUpdate }) => {
  const token = useSelector((state) => state.user.currentUser.token);
  const user = useSelector((state) => state.user.currentUser.details);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    username: user.username,
    city: user.city,
    website: user.website,
  });

  const upload = async (e) => {
    setCover(e.target.files[0]);
    const myFile = e.target.files[0];
    if (!myFile) return alert("you must choose an image file");
    const imageRef = ref(storage, `images/${myFile.name + v4()}`);
    uploadBytes(imageRef, myFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setCoverImageUrl(url);
      });
    });
    try {
    } catch (err) {
      console.log(err);
    }
  };
  const uploadP = async (e) => {
    setProfile(e.target.files[0]);
    const myFile = e.target.files[0];
    if (!myFile) return alert("you must choose an image file");
    const imageRef = ref(storage, `images/${myFile.name + v4()}`);
    uploadBytes(imageRef, myFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProfileImageUrl(url);
      });
    });
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // try {
    //   const data = {
    //     ...texts,
    //     coverPi: coverImageUrl ? coverImageUrl : user.coverPi,
    //     profilePi: profileImageUrl ? profileImageUrl : user.profilePi,
    //   };
    //   const res = await userRequest(token).put("users/" + user._id, data);
    //   localStorage.setItem("user", JSON.stringify(res.data));
    //   window.location.reload();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={cover ? URL.createObjectURL(cover) : user?.coverPi}
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={upload}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile ? URL.createObjectURL(profile) : +user?.profilePi
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={uploadP}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={texts.username}
            name="username"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
        <button className="close updateL" onClick={handleClick}>
          Update
        </button>
      </div>
    </div>
  );
};
export default Update;
