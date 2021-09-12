import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Theatre {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
