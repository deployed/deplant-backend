import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Plant {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  plantDate: Date;

  @Column()
  specie: string;

  @Column()
  daysBetweenWaters: number;
}

export default Plant;
