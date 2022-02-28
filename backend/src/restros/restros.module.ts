import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restros } from './restro.entity';
import { RestrosController } from './restros.controller';
import { RestrosService } from './restros.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restros])],
  providers: [RestrosService],
  controllers: [RestrosController],
  exports: [RestrosService],
})
export class RestrosModule {}
