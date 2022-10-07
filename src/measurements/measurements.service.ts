import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import Sensor from 'src/sensors/entities/sensor.entity';

import CreateMeasurementDto from './dtos/create-measurement.dto';
import Flower from 'src/flowers/entities/flower.entity';
import Measurement from './entities/measurement.entity';

@Injectable()
class MeasurementsService {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementsRepository: Repository<Measurement>,
    @InjectRepository(Sensor)
    private readonly sensorsRepository: Repository<Sensor>,
    @InjectRepository(Flower)
    private readonly flowersRepository: Repository<Flower>,
  ) {}

  async getMeasurement(id: number): Promise<Measurement> {
    const measurement = await this.measurementsRepository.findOne(id, {
      relations: ['flower', 'sensor'],
    });

    if (!measurement) {
      throw new HttpException(
        `Flower with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return measurement;
  }

  getMeasurements() {
    return this.measurementsRepository.find();
  }

  async createMeasurement(
    createMeasurementDto: CreateMeasurementDto,
  ): Promise<Measurement> {
    const measurement = new Measurement();

    measurement.humidity = createMeasurementDto.humidity;
    measurement.temperature = createMeasurementDto.temperature;
    measurement.time = new Date();

    const sensor = await this.sensorsRepository.findOne({
      relations: ['flower'],
      where: { macAddress: createMeasurementDto.sensorMacAddress },
    });

    if (!sensor) {
      throw new HttpException('Sensor not found', HttpStatus.NOT_FOUND);
    }

    const flower = await this.flowersRepository.findOne(sensor.flower.id);
    if (!flower) {
      throw new HttpException('Flower not found', HttpStatus.NOT_FOUND);
    }

    measurement.flower = flower;
    measurement.sensor = sensor;

    return this.measurementsRepository.save(measurement);
  }
}

export default MeasurementsService;
