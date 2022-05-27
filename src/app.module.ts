import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import Plant from './plants/entities/plant.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ autoLoadEntities: true, synchronize: true }),
    TypeOrmModule.forFeature([Plant]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
