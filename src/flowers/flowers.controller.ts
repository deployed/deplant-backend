import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import CreateFlowerDto from './dtos/create-flower.dto';
import FlowersService from './flowers.service';

@Controller('flowers')
class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Get(':id')
  async getFlower(@Param('id', ParseIntPipe) id: number) {
    const flower = await this.flowersService.getFlower(id);
    return flower;
  }

  @Get()
  getFlowers() {
    return this.flowersService.getFlowers();
  }

  @Post()
  createFlower(@Body() createFlowerDto: CreateFlowerDto) {
    return this.flowersService.createFlower(createFlowerDto);
  }

  @Delete(':id')
  deleteFlower(@Param('id', ParseIntPipe) id: number) {
    return this.flowersService.deleteFlower(id);
  }

  @Post(':id/water')
  waterFlower(@Param('id', ParseIntPipe) flowerId: number) {
    return this.flowersService.waterFlower(flowerId);
  }
}

export default FlowersController;
