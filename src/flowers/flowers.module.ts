import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import FlowersController from './flowers.controller';
import FlowersService from './flowers.service';

import Flower from 'src/flowers/entities/flower.entity';
import Sensor from 'src/sensors/entities/sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flower, Sensor])],
  controllers: [FlowersController],
  providers: [FlowersService],
  exports: [FlowersService],
})
export class FlowersModule {}
