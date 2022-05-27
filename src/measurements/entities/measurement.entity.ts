import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Flower from 'src/flowers/entities/flower.entity';
import Sensor from 'src/sensors/entities/sensor.entity';

@Entity()
class Measurement {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'timestamptz' })
  time: Date;

  @ManyToOne(() => Flower, (flower) => flower.sensor)
  flower: Flower;

  @ManyToOne(() => Sensor, (sensor) => sensor.measurements)
  sensor: Flower;
}

export default Measurement;
