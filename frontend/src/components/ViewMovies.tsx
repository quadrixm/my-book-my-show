import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {AUTH_USER_ID_KEY, LOGIN_PATH, SHOWS_PATH} from "../constants";
import {HomeLayout} from "./HomeLayout";
import axios from "axios";
import {Movie} from "../types";
import {Card} from "react-bootstrap";

export const ViewMovies = () => {
  const signedIn = localStorage.getItem(AUTH_USER_ID_KEY) && localStorage.getItem(AUTH_USER_ID_KEY)?.length;
  const [movies, setMovies] = React.useState<Movie[]>([]);

  React.useEffect(() => {
    axios.get('movies').then(
      ({data}) => {
        console.log({data})
        const movies = data as Movie[];
        setMovies(movies);
      },
      (err) => alert((err?.response?.data?.message || 'Server error.')),
    );
  }, []);

  if (!signedIn) {
    return <Redirect to={LOGIN_PATH} />;
  }
  return (
    <HomeLayout>
      <br/>
      {movies.map(movie => (
        <Card>
          <Card.Body>
            <Card.Text>
              <Link to={{pathname: SHOWS_PATH.replace(':movieId', String(movie.id))}}>
                {movie.name}
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </HomeLayout>
  );
}
