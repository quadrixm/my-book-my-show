import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Booking } from './entities/booking.entity';
import { Movie } from './entities/movie.entity';
import { Show } from './entities/show.entity';
import { Theatre } from './entities/theatre.entity';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { BookingService } from './services/booking.service';
import { MovieService } from './services/movie.service';
import { ShowService } from './services/show.service';
import { TheatreService } from './services/theatre.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'my_book_my_show_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Booking, Movie, Show, Theatre, User]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BookingService,
    MovieService,
    ShowService,
    TheatreService,
    UserService,
  ],
})
export class AppModule {}
