import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  showId: number;

  @Column()
  noOfSeats: number;

  @Column()
  bookingCode: string;
}
