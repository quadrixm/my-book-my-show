import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(@InjectRepository(Booking) private repo: Repository<Booking>) {}

  async create(data: DeepPartial<Booking>): Promise<Booking | undefined> {
    return this.repo.save(data);
  }

  findOne(id: number): Promise<Booking> {
    return this.repo.findOne(id);
  }
}
