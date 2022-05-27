import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsInt, IsString, IsOptional } from 'class-validator';

import { SunDemand } from '../constants';

class CreateFlowerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  specie: string;

  @ApiProperty()
  @IsInt()
  wateringIntervalInDays: number;

  @ApiProperty({ enum: SunDemand })
  @IsEnum(SunDemand)
  sunDemand: SunDemand;

  @ApiProperty()
  @IsInt()
  room: number;

  @ApiProperty()
  @IsInt()
  sill: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sensorMacAddress: string;
}

export default CreateFlowerDto;
