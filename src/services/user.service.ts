import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(data: DeepPartial<User>): Promise<User | undefined> {
    return this.repo.save(data);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repo.findOne({ email });
  }
}
