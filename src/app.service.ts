import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SunDemand } from './flowers/constants';
import Flower from './flowers/entities/flower.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Flower)
    private readonly plantRepository: Repository<Flower>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getPlants() {
    return this.plantRepository.find({
      relations: ['waterings', 'sensor', 'measurements'],
    });
  }

  createPlant() {
    const plant = new Flower();

    plant.name = 'Mariusz';
    plant.plantDate = new Date();
    plant.specie = 'goździk';
    plant.wateringIntervalInDays = 5;
    plant.sunDemand = SunDemand.PartialSun;
    plant.room = 1;
    plant.sill = 2;

    return this.plantRepository.save(plant);
  }
}
