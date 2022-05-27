import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FlowersModule } from './flowers/flowers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ autoLoadEntities: true, synchronize: true }),
    FlowersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
