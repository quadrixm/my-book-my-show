import * as _ from 'lodash';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { In } from 'typeorm';
import { AppService } from './app.service';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { MovieService } from './services/movie.service';
import { TheatreService } from './services/theatre.service';
import { ShowService } from './services/show.service';
import { BookingService } from './services/booking.service';
import { Movie } from './entities/movie.entity';
import { Theatre } from './entities/theatre.entity';
import { Booking } from './entities/booking.entity';

export interface Credentials {
  email: string;
  password: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export type ShowTo = {
  id: number;
  movie?: Movie;
  theatre?: Theatre;
  timing: string;
};

export interface CreateBookingDto {
  userId: number;
  showId: number;
  noOfSeats: number;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly movieService: MovieService,
    private readonly theatreService: TheatreService,
    private readonly showService: ShowService,
    private readonly bookingService: BookingService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  async login(@Body() credentials: Credentials) {
    if (!credentials.email || !credentials.password) {
      throw new HttpException('Missing email or password', 404);
    }
    const user = await this.userService.findByEmail(credentials.email);
    if (!user) {
      throw new HttpException('Incorrect email or password.', 404);
    }
    if (user.password !== credentials.password) {
      throw new HttpException('Invalid credentials', 404);
    }
    user.clean();
    return user;
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new HttpException('Missing required field', 404);
    }
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    await this.userService.create(user);
  }

  @Get('/movies')
  async getMovies() {
    return this.movieService.find({});
  }

  @Get('/shows/:movieId')
  async getShows(@Param() params) {
    const shows = await this.showService.find({
      where: { movieId: params.movieId },
    });
    const movieIds = _.map(_.uniqBy(shows, 'movieId'), 'movieId');
    const theatreIds = _.map(_.uniqBy(shows, 'theatreId'), 'theatreId');
    const movies = await this.movieService.find({
      where: { id: In(movieIds) },
    });
    const theatres = await this.theatreService.find({
      where: { id: In(theatreIds) },
    });
    return shows.map<ShowTo>((show) => ({
      id: show.id,
      movie: movies.find((movie) => movie.id === show.movieId),
      theatre: theatres.find((theatre) => theatre.id === show.theatreId),
      timing: show.timing,
    }));
  }

  @Post('book-show')
  async bookShow(@Body() createBookingDto: CreateBookingDto) {
    if (
      !createBookingDto.userId ||
      !createBookingDto.showId ||
      !createBookingDto.noOfSeats
    ) {
      throw new HttpException('Missing required field', 404);
    }
    const show = await this.showService.findOne(createBookingDto.showId);
    if (!show) {
      throw new HttpException('Show not found!', 404);
    }
    const booking = new Booking();
    booking.showId = createBookingDto.showId;
    booking.userId = createBookingDto.userId;
    booking.noOfSeats = createBookingDto.noOfSeats;
    booking.bookingCode = _.uniqueId('BOOKING');
    return this.bookingService.create(booking);
  }

  @Get('bookings/:bookingId')
  async getBooking(@Param() params) {
    return this.bookingService.findOne(params.bookingId);
  }

  @Get('populate')
  async populate() {
    // Added manually
    // const movies = [
    //   'Black Widow',
    //   'A Quiet Place',
    //   'Jungle Cruise',
    //   'Free Guy',
    //   'Cruella',
    //   'Godzilla vs. Kong',
    // ];
    // const theatres = ['Eros Cinema', 'Cineplex', 'PVR Plaza'];
    // const timings = ['10AM - 12AM', '1PM - 3PM', '4PM - 7PM', '8PM - 11PM'];
  }
}
