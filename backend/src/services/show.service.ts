import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from '../entities/show.entity';

@Injectable()
export class ShowService {
  constructor(@InjectRepository(Show) private repo: Repository<Show>) {}

  async create(data: DeepPartial<Show>): Promise<Show | undefined> {
    return this.repo.save(data);
  }

  find(options?: FindManyOptions<Show>): Promise<Show[] | undefined> {
    return this.repo.find(options);
  }

  findOne(id: number): Promise<Show> {
    return this.repo.findOne(id);
  }
}
