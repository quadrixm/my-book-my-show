import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Theatre } from '../entities/theatre.entity';

@Injectable()
export class TheatreService {
  constructor(@InjectRepository(Theatre) private repo: Repository<Theatre>) {}

  async create(data: DeepPartial<Theatre>): Promise<Theatre | undefined> {
    return this.repo.save(data);
  }
}
