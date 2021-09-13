import React from 'react';
import {Redirect, useHistory, useParams} from "react-router-dom";
import {AUTH_USER_ID_KEY, BOOKING_DETAIL_PATH, LOGIN_PATH} from "../constants";
import {HomeLayout} from "./HomeLayout";
import axios from "axios";
import {Booking, Show} from "../types";
import {Button, Card} from "react-bootstrap";

interface MyParams {
  movieId?: string;
}

export const ViewShows = () => {
  const authUserId = localStorage.getItem(AUTH_USER_ID_KEY);
  const signedIn = authUserId && authUserId.length;
  const history = useHistory();
  const { movieId } = useParams<MyParams>();
  const [shows, setShows] = React.useState<Show[]>([]);

  React.useEffect(() => {
    axios.get(`/shows/${movieId}`).then(
      ({data}) => {
        console.log({data})
        const shows = data as Show[];
        setShows(shows);
      },
      (err) => alert((err?.response?.data?.message || 'Server error.')),
    );
  }, [movieId]);

  const onBook = (showId: number) => {
    if (!authUserId || !showId) {
      return;
    }
    const seatCount = prompt('Please enter number of seats to book');
    if (!seatCount) {
      alert('Please select number of seat count!');
      return;
    }
    const data = {
      showId,
      userId: parseInt(authUserId),
      noOfSeats: parseInt(seatCount),
    }
    axios.post('book-show', data).then(
      ({data}) => {
        console.log({data})
        const booking = data as Booking;
        history.push({pathname: BOOKING_DETAIL_PATH.replace(':bookingId', String(booking.id))})
      },
      (err) => alert((err?.response?.data?.message || 'Server error.')),
    );
  }

  if (!signedIn) {
    return <Redirect to={LOGIN_PATH} />;
  }
  return (
    <HomeLayout>
      {shows.map(show => (
        <Card>
          <Card.Body>
            <Card.Title>{show.movie.name}</Card.Title>
            <Card.Text><b>Theatre: </b> {show.theatre.name}</Card.Text>
            <Card.Text><b>Timings: </b> {show.timing}</Card.Text>
            <Button variant="primary" onClick={() => onBook(show.id)}>Book</Button>
          </Card.Body>
        </Card>
      ))}
    </HomeLayout>
  );
}
