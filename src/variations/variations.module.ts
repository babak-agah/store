import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { VariationsController } from './variations.controller';
import { VariationsService } from './variations.service';
import { VariationSchema } from './variations.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Variation', schema: VariationSchema }]),
  ],
  controllers: [VariationsController],
  providers: [VariationsService],
})
export class VariationsModule {}
