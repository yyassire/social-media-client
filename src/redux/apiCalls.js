import { publicRequest } from "../axios";

import { loginFailure, loginStart, loginSuccess } from "./UserReducer";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    window.location.replace("/");
    console.log(res);
  } catch (err) {
    dispatch(loginFailure());
    console.log(err);
  }
};
