import { CreateProductCategoriesDto } from './dtos/create-product-categoies.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { ProductCategoriesService } from './product-categories.service';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private productCategoriesService: ProductCategoriesService) {}

  @Post()
  async createCategory(@Body() body: CreateProductCategoriesDto) {
    const result = this.productCategoriesService.create(body);
    return result;
  }

  @Get()
  getCategories() {
    // check filters
    return this.productCategoriesService.find();
  }
}
