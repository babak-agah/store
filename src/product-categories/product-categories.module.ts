import { ProductCategoriesController } from './product-categories.controller';
import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategorySchema } from './product-category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductCategory', schema: ProductCategorySchema },
    ]),
  ],
  providers: [ProductCategoriesService],
  controllers: [ProductCategoriesController],
})
export class ProductCategoriesModule {}
