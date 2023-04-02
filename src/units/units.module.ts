import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { UnitSchema } from './unit.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Unit', schema: UnitSchema }])],
  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule {}
