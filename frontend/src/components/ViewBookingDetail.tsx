import React from 'react';
import {Redirect, useHistory, useParams} from "react-router-dom";
import {AUTH_USER_ID_KEY, BOOKING_DETAIL_PATH, LOGIN_PATH, ROOT_PATH} from "../constants";
import {HomeLayout} from "./HomeLayout";
import {Booking, Show} from "../types";
import axios from "axios";
import {Alert, Button, Card} from "react-bootstrap";

interface MyParams {
  bookingId?: string;
}

export const ViewBookingDetail = () => {
  const signedIn = localStorage.getItem(AUTH_USER_ID_KEY) && localStorage.getItem(AUTH_USER_ID_KEY)?.length;
  const history = useHistory();
  const { bookingId } = useParams<MyParams>();
  const [booking, setBooking] = React.useState<Booking>();

  React.useEffect(() => {
    axios.get(`/bookings/${bookingId}`).then(
      ({data}) => {
        console.log({data})
        const booking = data as Booking;
        setBooking(booking);
      },
      (err) => alert((err?.response?.data?.message || 'Server error.')),
    );
  }, [bookingId]);

  const onExit = () => {
    history.push({pathname: ROOT_PATH});
  }

  if (!signedIn) {
    return <Redirect to={LOGIN_PATH} />;
  }
  return (
    <HomeLayout>
      <Card>
        <Card.Body>
          <Alert variant={'success'}>
            Booking successful!
          </Alert>
          <Card.Text><b>Booking Code: </b> {booking?.bookingCode ?? ''}</Card.Text>
          <Card.Text><b>Movie: </b> {booking?.show?.movie?.name ?? ''}</Card.Text>
          <Card.Text><b>Theatre: </b> {booking?.show?.theatre?.name ?? ''}</Card.Text>
          <Card.Text><b>Timings: </b> {booking?.show?.timing ?? ''}</Card.Text>
          <br/><br/>
          <Button onClick={() => onExit()}>Exit</Button>
        </Card.Body>
      </Card>
    </HomeLayout>
  );
}
