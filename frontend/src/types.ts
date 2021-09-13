export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Show {
  id: number;
  movie: Movie;
  theatre: Theatre;
  timing: string;
}

export interface Theatre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  name: string;
}

export interface Booking {
  id: number;
  userId: number;
  show: Show;
  noOfSeats: number;
  bookingCode: string;
}
