import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Flower from 'src/flowers/entities/flower.entity';
import Measurement from 'src/measurements/entities/measurement.entity';

@Entity()
class Sensor {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  macAddress: string;

  @OneToOne(() => Flower, (flower) => flower.sensor)
  flower: Flower;

  @OneToMany(() => Measurement, (measurement) => measurement.sensor)
  measurements: Measurement[];
}

export default Sensor;
