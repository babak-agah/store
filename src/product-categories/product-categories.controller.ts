import { UpdateProductCategoriesDto } from './dtos/update-product-categoies.dto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoriesDto } from './dtos/create-product-categoies.dto copy';

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

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateProductCategoriesDto,
  ) {
    const result = await this.productCategoriesService.update(id, body);
    return result;
  }
}
