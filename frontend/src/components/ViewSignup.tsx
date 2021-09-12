import React from 'react';
import {AUTH_USER_ID_KEY, ROOT_PATH} from "../constants";
import {Redirect} from "react-router-dom";

export const ViewSignup = () => {
  const signedIn = localStorage.getItem(AUTH_USER_ID_KEY) && localStorage.getItem(AUTH_USER_ID_KEY)?.length;
  if (signedIn) {
    return <Redirect to={ROOT_PATH} />;
  }
  return (
    <div>Signup</div>
  );
}
