import React from 'react';
import {AUTH_USER_ID_KEY, LOGIN_PATH} from "../constants";
import {Redirect} from "react-router-dom";

export const ViewHome = () => {
  const signedIn = localStorage.getItem(AUTH_USER_ID_KEY) && localStorage.getItem(AUTH_USER_ID_KEY)?.length;
  if (!signedIn) {
    return <Redirect to={LOGIN_PATH} />;
  }
  return (
    <div>Home</div>
  );
}
