import React from 'react';
import {
  BASE_API_URL,
  BOOKING_DETAIL_PATH,
  BOOKINGS_PATH,
  LOGIN_PATH,
  MOVIES_PATH,
  ROOT_PATH,
  SHOWS_PATH,
  SIGNUP_PATH
} from "./constants";
import {HashRouter, Route, Switch} from "react-router-dom";
import {ViewLogin} from "./components/ViewLogin";
import {ViewSignup} from "./components/ViewSignup";
import {ViewMovies} from "./components/ViewMovies";
import {ViewShows} from "./components/ViewShows";
import {ViewBookingDetail} from "./components/ViewBookingDetail";
import {ViewBookings} from "./components/ViewBookings";
import axios from "axios";

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact={true} path={ROOT_PATH} component={ViewMovies}/>
        <Route path={LOGIN_PATH} component={ViewLogin} />
        <Route path={SIGNUP_PATH} component={ViewSignup} />
        <Route path={MOVIES_PATH} component={ViewMovies} />
        <Route path={SHOWS_PATH} component={ViewShows} />
        <Route path={BOOKING_DETAIL_PATH} component={ViewBookingDetail} />
        <Route path={BOOKINGS_PATH} component={ViewBookings} />
      </Switch>
    </HashRouter>
  );
}

export default App;
