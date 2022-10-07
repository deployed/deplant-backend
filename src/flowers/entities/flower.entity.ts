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
import { FlowerStatus, SunDemand } from '../constants';
import { addMinutes, compareAsc, addDays } from 'date-fns';

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

  status?: FlowerStatus;

  public getStatus(): FlowerStatus {
    return this.sensor && this.measurements.length
      ? this.getStatusByMeasurements()
      : this.getStatusByWaterings();
  }

  private getStatusByWaterings(): FlowerStatus {
    const lastWatering = this.waterings[this.waterings.length - 1];
    if (!lastWatering) {
      return FlowerStatus.Bad;
    }

    if (
      compareAsc(
        new Date(),
        addDays(lastWatering.time, this.wateringIntervalInDays * 1.66),
      ) > 0
    ) {
      return FlowerStatus.Bad;
    } else if (
      compareAsc(
        new Date(),
        addDays(lastWatering.time, this.wateringIntervalInDays),
      ) > 0
    ) {
      return FlowerStatus.Ok;
    } else {
      return FlowerStatus.Well;
    }
  }

  private getStatusByMeasurements(): FlowerStatus {
    const latestMeasurement = this.measurements[this.measurements.length - 1];
    if (!latestMeasurement) {
      return FlowerStatus.Bad;
    }

    if (compareAsc(new Date(), addMinutes(latestMeasurement.time, 180)) > 0) {
      return FlowerStatus.Bad;
    }

    if (latestMeasurement.humidity > 70) {
      return FlowerStatus.Well;
    } else if (latestMeasurement.humidity > 20) {
      return FlowerStatus.Ok;
    } else {
      return FlowerStatus.Bad;
    }
  }
}

export default Flower;
