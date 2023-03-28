import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StatesSchema } from './state.entity';
import { StatesController } from './states.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'State', schema: StatesSchema }]),
  ],
  providers: [StatesService],
  controllers: [StatesController],
})
export class StatesModule {}
