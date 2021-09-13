import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';
import { Booking } from '../entities/booking.entity';

@Injectable()
export class MovieService {
  constructor(@InjectRepository(Movie) private repo: Repository<Movie>) {}

  async create(data: DeepPartial<Movie>): Promise<Movie | undefined> {
    return this.repo.save(data);
  }

  find(options?: FindManyOptions<Movie>): Promise<Movie[] | undefined> {
    return this.repo.find(options);
  }

  findOne(id: number): Promise<Movie> {
    return this.repo.findOne(id);
  }
}
