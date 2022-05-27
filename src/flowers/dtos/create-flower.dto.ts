import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsInt, IsString, IsOptional } from 'class-validator';

import { SunDemand } from '../constants';

class CreateFlowerDto {
  @ApiProperty()
  @IsString({ message: 'Is required' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'Is required ' })
  specie: string;

  @ApiProperty()
  @IsInt({ message: 'Must be an integer' })
  wateringIntervalInDays: number;

  @ApiProperty({ enum: SunDemand })
  @IsEnum(SunDemand, { message: 'Must be of SunDemand enum type' })
  sunDemand: SunDemand;

  @ApiProperty()
  @IsInt({ message: 'Must be an integer' })
  room: number;

  @ApiProperty()
  @IsInt({ message: 'Must be an integer' })
  sill: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sensorMacAddress: string;
}

export default CreateFlowerDto;
