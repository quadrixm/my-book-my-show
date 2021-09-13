import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Theatre } from '../entities/theatre.entity';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class TheatreService {
  constructor(@InjectRepository(Theatre) private repo: Repository<Theatre>) {}

  async create(data: DeepPartial<Theatre>): Promise<Theatre | undefined> {
    return this.repo.save(data);
  }

  find(options?: FindManyOptions<Movie>): Promise<Movie[] | undefined> {
    return this.repo.find(options);
  }

  findOne(id: number): Promise<Theatre> {
    return this.repo.findOne(id);
  }
}
