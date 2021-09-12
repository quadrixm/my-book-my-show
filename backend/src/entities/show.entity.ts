import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Show {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  movieId: number;

  @Column()
  theatreId: number;

  @Column()
  timing: string;
}
