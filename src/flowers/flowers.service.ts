import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Sensor from 'src/sensors/entities/sensor.entity';
import { DeleteResult, Repository } from 'typeorm';
import CreateFlowerDto from './dtos/create-flower.dto';
import Flower from './entities/flower.entity';

@Injectable()
class FlowersService {
  constructor(
    @InjectRepository(Flower)
    private readonly flowersRepository: Repository<Flower>,
    @InjectRepository(Sensor)
    private readonly sensorsRepository: Repository<Sensor>,
  ) {}

  async getFlower(id: number): Promise<Flower> {
    const flower = await this.flowersRepository.findOne(id, {
      relations: ['sensor', 'measurements', 'waterings'],
    });

    if (!flower) {
      throw new HttpException(
        `Flower with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return flower;
  }

  getFlowers() {
    return this.flowersRepository.find({
      relations: ['waterings'],
    });
  }

  async createFlower(createFlowerDto: CreateFlowerDto): Promise<Flower> {
    const flower = new Flower();

    flower.name = createFlowerDto.name;
    flower.plantDate = new Date();
    flower.specie = createFlowerDto.specie;
    flower.wateringIntervalInDays = createFlowerDto.wateringIntervalInDays;
    flower.sunDemand = createFlowerDto.sunDemand;
    flower.room = createFlowerDto.room;
    flower.sill = createFlowerDto.sill;

    let sensor: Sensor | undefined;
    if (createFlowerDto.sensorMacAddress) {
      sensor = new Sensor();
      sensor.macAddress = createFlowerDto.sensorMacAddress;

      sensor = await this.sensorsRepository.save(sensor);
      flower.sensor = sensor;
    }

    return this.flowersRepository.save(flower);
  }

  async deleteFlower(id: number): Promise<DeleteResult> {
    const result = await this.flowersRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Flower not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}

export default FlowersService;
