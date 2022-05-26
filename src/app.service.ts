import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Plant from './plants/entities/plant.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getPlants() {
    return this.plantRepository.find();
  }

  createPlant() {
    const plant = new Plant();

    plant.name = 'Grzegorz';
    plant.plantDate = new Date();
    plant.specie = 'tulipan';
    plant.daysBetweenWaters = 2;

    return this.plantRepository.save(plant);
  }
}
