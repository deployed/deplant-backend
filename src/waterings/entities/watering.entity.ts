import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Flower from 'src/flowers/entities/flower.entity';

@Entity()
class Watering {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'timestamptz', default: new Date() })
  time: Date;

  @ManyToOne(() => Flower, (flower) => flower.waterings)
  flower: Flower;
}

export default Watering;
