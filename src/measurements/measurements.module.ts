import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import MeasurementsService from './measurements.service';
import MeasurementsController from './measurements.controller';

import Flower from 'src/flowers/entities/flower.entity';
import Sensor from 'src/sensors/entities/sensor.entity';
import Measurement from './entities/measurement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flower, Sensor, Measurement])],
  controllers: [MeasurementsController],
  providers: [MeasurementsService],
  exports: [MeasurementsService],
})
export class MeasurementsModule {}
