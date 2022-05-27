import { IsEnum, IsInt, IsString, IsOptional } from 'class-validator';

import { SunDemand } from '../constants';

class CreateFlowerDto {
  @IsString()
  name: string;

  @IsString()
  specie: string;

  @IsInt()
  wateringIntervalInDays: number;

  @IsEnum(SunDemand)
  sunDemand: SunDemand;

  @IsInt()
  room: number;

  @IsInt()
  sill: number;

  @IsOptional()
  @IsString()
  sensorMacAddress: string;
}

export default CreateFlowerDto;
