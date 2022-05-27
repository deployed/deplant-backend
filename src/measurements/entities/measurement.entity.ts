import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Flower from 'src/flowers/entities/flower.entity';
import Sensor from 'src/sensors/entities/sensor.entity';

@Entity()
class Measurement {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'timestamptz' })
  time: Date;

  @Column({ type: 'decimal' })
  temperature: number;

  @Column({ type: 'decimal' })
  humidity: number;

  @ManyToOne(() => Flower, (flower) => flower.sensor)
  flower: Flower;

  @ManyToOne(() => Sensor, (sensor) => sensor.measurements)
  sensor: Sensor;
}

export default Measurement;
