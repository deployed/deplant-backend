import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import CreateMeasurementDto from './dtos/create-measurement.dto';
import MeasurementsService from './measurements.service';

@Controller('measurements')
class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Get(':id')
  async getMeasurement(@Param('id', ParseIntPipe) id: number) {
    return await this.measurementsService.getMeasurement(id);
  }

  @Get()
  getMeasurements() {
    return this.measurementsService.getMeasurements();
  }

  @Post()
  createMeasurement(@Body() createMeasurementDto: CreateMeasurementDto) {
    console.log('CREATE MEASUREMENT', { createMeasurementDto });
    return this.measurementsService.createMeasurement(createMeasurementDto);
  }
}

export default MeasurementsController;
