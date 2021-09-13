import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Show {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  movieId: number;

  @Column()
  theatreId: number;

  @Column()
  timing: string;
}
