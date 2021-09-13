import React from 'react';
import {Redirect} from "react-router-dom";
import {AUTH_USER_ID_KEY, LOGIN_PATH} from "../constants";
import {HomeLayout} from "./HomeLayout";
import {Booking} from "../types";
import axios from "axios";
import {Card} from "react-bootstrap";

export const ViewBookings = () => {
  const authUserId = localStorage.getItem(AUTH_USER_ID_KEY);
  const signedIn = authUserId && authUserId.length;
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    axios.get(`/bookings/${authUserId}`).then(
      ({data}) => {
        const bookings = data as Booking[];
        console.log({bookings})
        setBookings(bookings);
      },
      (err) => alert((err?.response?.data?.message || 'Server error.')),
    );
  }, [authUserId]);

  if (!signedIn) {
    return <Redirect to={LOGIN_PATH} />;
  }
  return (
    <HomeLayout>
      <br/>
      {bookings?.length ? bookings.map(booking => (
        <Card>
          <Card.Body>
            <Card.Text><b>Booking Code: </b> {booking?.bookingCode ?? ''}</Card.Text>
            <Card.Text><b>Movie: </b> {booking?.show?.movie?.name ?? ''}</Card.Text>
            <Card.Text><b>Theatre: </b> {booking?.show?.theatre?.name ?? ''}</Card.Text>
            <Card.Text><b>Timings: </b> {booking?.show?.timing ?? ''}</Card.Text>
          </Card.Body>
        </Card>
      )) : []}
    </HomeLayout>
  );
}
