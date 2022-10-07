import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateMeasurementDto {
  @ApiProperty()
  @IsString({ message: 'Is required' })
  sensorMacAddress: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  temperature: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  humidity: number;
}

export default CreateMeasurementDto;
