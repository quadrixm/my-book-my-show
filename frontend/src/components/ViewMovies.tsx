import React from 'react';
import {Redirect} from "react-router-dom";
import {AUTH_USER_ID_KEY, LOGIN_PATH} from "../constants";
import {HomeLayout} from "./HomeLayout";

export const ViewMovies = () => {
  const signedIn = localStorage.getItem(AUTH_USER_ID_KEY) && localStorage.getItem(AUTH_USER_ID_KEY)?.length;
  if (!signedIn) {
    return <Redirect to={LOGIN_PATH} />;
  }
  return (
    <HomeLayout>
      Movies
    </HomeLayout>
  );
}
