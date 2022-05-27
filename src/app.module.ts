import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import Flower from './flowers/entities/flower.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ autoLoadEntities: true, synchronize: true }),
    TypeOrmModule.forFeature([Flower]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
