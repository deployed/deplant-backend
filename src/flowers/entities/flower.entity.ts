import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Sensor from 'src/sensors/entities/sensor.entity';
import Watering from 'src/waterings/entities/watering.entity';
import Measurement from 'src/measurements/entities/measurement.entity';
import { SunDemand } from '../constants';

@Entity()
class Flower {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  specie: string;

  @Column({ type: 'timestamptz' })
  plantDate: Date;

  @Column()
  wateringIntervalInDays: number;

  @Column({ type: 'enum', enum: SunDemand })
  sunDemand: SunDemand;

  @Column()
  room: number;

  @Column()
  sill: number;

  @OneToOne(() => Sensor, (sensor) => sensor.flower)
  @JoinColumn()
  sensor: Sensor;

  @OneToMany(() => Watering, (watering) => watering.flower)
  @JoinColumn()
  waterings: Watering[];

  @OneToMany(() => Measurement, (measurement) => measurement.flower)
  @JoinColumn()
  measurements: Measurement[];
}

export default Flower;
